using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.ExaminationDtos;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EnglishCenterManagement.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ExaminationController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IExaminationRepository _examinationRepository;
        public ExaminationController (
            IMapper mapper,
            IUserRepository userRepository,
            IExaminationRepository examinationRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _examinationRepository = examinationRepository;
        }
        #region Quiz
        [HttpGet("quizzes")]
        [Authorize(Roles = "Teacher")]
        public ActionResult<PagedResponse>GetAllQuizzes(string? search, int page = 1, int pageSize = 20)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var listQuizzes = _examinationRepository.GetAllQuizzes(search, page, pageSize);
            var mappedQuizzes = _mapper.Map<List<BasicQuizInfoDto>>(listQuizzes.Data);
            listQuizzes.Data = mappedQuizzes;

            return Ok(new ApiReponse(listQuizzes));
        }

        [HttpGet("my-quizzes")]
        [Authorize(Roles = nameof(RoleType.Student))]
        public ActionResult<PagedResponse> GetMyQuizzes(string? search, int page = 1, int pageSize = 20)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var myQuizzes = _examinationRepository.GetMyQuizzes(search, user.Id, page, pageSize);
            var mappedMyQuizzes = _mapper.Map<List<BasicQuizInfoDto>>(myQuizzes.Data);
            myQuizzes.Data = mappedMyQuizzes;

            return Ok(new ApiReponse(myQuizzes));
        }

        [HttpGet("quiz/{id}")]
        [Authorize(Roles = "Student, Teacher")]
        public ActionResult<QuizDetailDto> GetQuizDetail(int id)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }

            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            var getQuizById = _examinationRepository.GetQuizById(id);
            if (getQuizById == null)
            {
                return NotFound(new ApiReponse(639));
            }

            // Nếu bài test dành cho lớp mà student ko học thì student ko có quyền làm
            if (user.Role == RoleType.Student)
            {
                if (!_examinationRepository.CheckQuizInStudentClass(user.Id, id))
                {
                    return Unauthorized(new ApiReponse(1000));
                }
                // Nếu student đã làm bài quiz này rồi
                if (_examinationRepository.CheckStudentDidQuiz(user.Id, id))
                {
                    return Unauthorized(new ApiReponse(1000));
                }
            }

            var mappedQuiz = _mapper.Map<QuizDetailDto>(getQuizById);
            var totalPoint = 0;

            var questions = _examinationRepository.GetListQuestionByQuizId(id);
            var mappedQuestions = _mapper.Map<List<QuestionDto>>(questions);

            mappedQuestions.ForEach(item =>
            {
                totalPoint += item.Point;
                var answers = _examinationRepository.GetAnwsersByQuestionId(item.Id);
                item.Answers = _mapper.Map<List<AnswerDto>>(answers);
            });

            mappedQuiz.Questions = mappedQuestions;
            mappedQuiz.TotalPoint = totalPoint;
            mappedQuiz.TotalQuestion = mappedQuestions.Count();

            return Ok(new ApiReponse(mappedQuiz));
        }

        [HttpPost("create-quiz")]
        [Authorize(Roles = nameof(RoleType.Teacher))]
        public ActionResult CreateQuiz([FromBody] CreateQuizDto newQuiz)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            if (newQuiz == null)
            {
                return BadRequest(new ApiReponse(600));
            }

            var mappedNewQuiz = _mapper.Map<QuizModel>(newQuiz);
            var mappedQuestions = _mapper.Map<List<QuestionModel>>(mappedNewQuiz.Questions);
            var index = 0;
            mappedQuestions.ForEach(item =>
            {
                item.Answers = _mapper.Map<List<AnswerModel>>(item.Answers);
                item.Order += index;
                index++;
            });
            mappedNewQuiz.Questions = mappedQuestions;
            mappedNewQuiz.TeacherId = user.Id;
            if (!_examinationRepository.CreateNewQuiz(mappedNewQuiz))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPut("update-quiz/{id}")]
        [Authorize(Roles = nameof(RoleType.Teacher))]
        public ActionResult UpdateQuiz([FromBody] CreateQuizDto updateQuiz, int id)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            if (updateQuiz == null)
            {
                return BadRequest(new ApiReponse(600));
            }
            
            var quizNeedUpdate = _examinationRepository.GetQuizById(id);
            if (_examinationRepository.GetQuizById(id) == null)
            {
                return NotFound(new ApiReponse(639));
            }
            if (quizNeedUpdate.Status == QuizStatusType.StudentDid)
            {
                return Conflict(new ApiReponse(641));
            }
            if (user.Id != quizNeedUpdate.TeacherId)
            {
                return Unauthorized(new ApiReponse(1000));
            }

            // delete old ques by quizId
            var listQuestion = _examinationRepository.GetListQuestionByQuizId(id);
            listQuestion.ToList().ForEach(item =>
            {
                _examinationRepository.DeleteQuestion(item);
            });

            // update quiz cũ by id
            var mappedUpdateQuiz = _mapper.Map(updateQuiz, quizNeedUpdate);
            var index = 0;
            mappedUpdateQuiz.Questions.ToList().ForEach(item =>
            {
                item.Order += index;
                index++;
            });
            _examinationRepository.UpdateQuiz(mappedUpdateQuiz);
          
            return StatusCode(StatusCodes.Status204NoContent);
        }

        // Note: Đã assign thì ko bỏ đc => chỉ thêm assign-class => get class assigned, get class need assign (status class), post class asign
        [HttpGet("assiged-classes/{id}")]
        [Authorize(Roles = nameof(RoleType.Teacher))]
        public ActionResult<List<AssignClassDto>> GetAssignedClassesByQuizId(int id)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getQuizById = _examinationRepository.GetQuizById(id);
            if (getQuizById == null)
            {
                return NotFound(new ApiReponse(639));
            }
            var listAssignedClasses = _examinationRepository.GetAssignedClasses(id);
            var map = _mapper.Map<List<AssignClassDto>>(listAssignedClasses);
            return Ok(new ApiReponse(map));
        }

        // Note: chua co pagination
        [HttpGet("assignable-classes/{id}")]
        [Authorize(Roles = nameof (RoleType.Teacher))]
        public ActionResult<List<AssignClassDto>> GetAssignableClassesByQuizId(int id)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getQuizById = _examinationRepository.GetQuizById(id);
            if (getQuizById == null)
            {
                return NotFound(new ApiReponse(639));
            }
            var listAssignableClasses = _examinationRepository.GetAssignableClasses(id);
            var map = _mapper.Map<List<AssignClassDto>>(listAssignableClasses);
            return Ok(new ApiReponse(map));
        }

        [HttpPost("assign-quiz-class")]
        [Authorize(Roles = nameof(RoleType.Teacher))]
        public ActionResult AssignQuizToClasses([FromBody] AssignQuizClassesDto assign)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            if (assign == null)
            {
                return BadRequest(new ApiReponse(600));
            }
            var getQuizById = _examinationRepository.GetQuizById(assign.QuizId);
            if (getQuizById == null)
            {
                return NotFound(new ApiReponse(639));
            }

            // check tập classId cần assign có valid ? (với mỗi classId check xem class đó có tồn tại ko, status có inprogress ko?, đã assign chưa )
            bool classIdsIsValid = _examinationRepository.CheckClassIdsNeedAssign(assign.QuizId, assign.ClassId);
            if (!classIdsIsValid)
            {
                return BadRequest(new ApiReponse(643));
            }

            assign.ClassId.ForEach(item =>
            {
                _examinationRepository.AssignQuizClass(assign.QuizId, item);
            });

            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpDelete("delete-quiz/{id}")]
        [Authorize(Roles = nameof(RoleType.Teacher))]
        public ActionResult DeleteQuiz(int id)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getQuizById = _examinationRepository.GetQuizById(id);
            if (getQuizById == null)
            {
                return NotFound(new ApiReponse(639));
            }
            // check author quiz
            if (getQuizById.TeacherId != user.Id)
            {
                return Unauthorized(new ApiReponse(1000));
            }
            // check if any student do this quiz
            if (getQuizById.Status == QuizStatusType.StudentDid)
            {
                return Conflict(new ApiReponse(640));
            }
            if (!_examinationRepository.DeleteQuiz(getQuizById))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status204NoContent);
        }
         
        [HttpGet("my-mark")]
        [Authorize(Roles = nameof(RoleType.Student))]
        public ActionResult<PagedResponse> GetMyMarks(int page = 1, int pageSize = 20) 
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var listMarks = _examinationRepository.GetMarksByStudentId(user.Id, page, pageSize);
            var mappedListMarks = _mapper.Map<List<MarkDto>>(listMarks.Data);
            mappedListMarks.ForEach(item =>
            {
                item.Name = _examinationRepository.GetQuizNameById(item.QuizId);
            });
            listMarks.Data = mappedListMarks;

            return Ok(new ApiReponse(listMarks));
        }

        [HttpPost("submit-quiz")]
        [Authorize(Roles =nameof(RoleType.Student))]
        public ActionResult SubmitQuiz([FromBody] QuizSubmitDto quizSubmitDto)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized() ;
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            if (quizSubmitDto == null)
            {
                return BadRequest(new ApiReponse(600));
            }
            var getQuizById = _examinationRepository.GetQuizById(quizSubmitDto.Id);
            if (getQuizById == null)
            {
                return NotFound(new ApiReponse(639));
            }
            if (!_examinationRepository.CheckQuizInStudentClass(user.Id, quizSubmitDto.Id))
            {
                return Unauthorized(new ApiReponse(1000));
            }
            if (_examinationRepository.CheckStudentDidQuiz(user.Id, quizSubmitDto.Id))
            {
                return Conflict(new ApiReponse(642));
            }

            // Check question
            var questionIdsInQuiz = _examinationRepository.GetListQuestionIdsByQuizId(quizSubmitDto.Id);
            Array.Sort(questionIdsInQuiz.ToArray());
            List<int> questionIdsSubmit = new List<int>();
            (quizSubmitDto.Questions).ForEach(item =>
            {
                questionIdsSubmit.Add(item.QuestionId);
            });
            Array.Sort(questionIdsSubmit.ToArray());
            if (!Enumerable.SequenceEqual(questionIdsInQuiz, questionIdsSubmit))
            {
                return BadRequest(new ApiReponse(600));
            }

            // Check answer 
            int point = 0;
            (quizSubmitDto.Questions).ForEach(item =>
            {
                var getQuestionById = _examinationRepository.GetQuestionById(item.QuestionId);
                var listAnswerIdsTrue = _examinationRepository.GetListAnswerIdsTrue(item.QuestionId);
                var listAnswerIdsSubmit = item.AnswerIds;

                Array.Sort(listAnswerIdsTrue.ToArray());
                Array.Sort(listAnswerIdsSubmit.ToArray());
                if (Enumerable.SequenceEqual(listAnswerIdsTrue, listAnswerIdsSubmit))
                {
                    point += getQuestionById.Point;
                }
            });

            int totalPoint = 0;
            var questionsOfQuiz = _examinationRepository.GetListQuestionByQuizId(quizSubmitDto.Id);
            questionsOfQuiz.ToList().ForEach(item =>
            {
                totalPoint += item.Point;
            });

            var createMarkDto = new CreateMarkDto
            {
                Point = point,
                TotalPoint = totalPoint,
                StudentId = user.Id,
                QuizId = quizSubmitDto.Id
            };

            var mappedMark = _mapper.Map<MarkModel>(createMarkDto);
            if (!_examinationRepository.CreateMark(mappedMark))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            getQuizById.Status = QuizStatusType.StudentDid;
            if (!_examinationRepository.UpdateQuiz(getQuizById))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status201Created);
        }

        #endregion
        private UserInfoModel? GetUserByClaim()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userId = identity?.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;
            if (userId != null)
            {
                return _userRepository.GetUserByUserId(int.Parse(userId));
            }
            return null;
        }
    }
}
