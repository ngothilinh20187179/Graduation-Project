using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.ClassRoomDto;
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
        private readonly IClassRoomRepository _classRoomRepository;
        private readonly ISubjectRoomRepository _subjectRoomRepository;
        private readonly ITeacherStudentRepository _teacherStudentRepository;
        private readonly IExaminationRepository _examinationRepository;
        public ExaminationController (
            IMapper mapper,
            IClassRoomRepository classRoomRepository,
            ISubjectRoomRepository subjectRoomRepository,
            IUserRepository userRepository,
            ITeacherStudentRepository teacherStudentRepository, 
            IExaminationRepository examinationRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _classRoomRepository = classRoomRepository;
            _subjectRoomRepository = subjectRoomRepository;
            _teacherStudentRepository = teacherStudentRepository;
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

            return Ok(myQuizzes);
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
            // Nếu student đã làm bài quiz này rồi ??? (solve: hiện tại cho phép làm nhiều lần)
            if (user.Role == RoleType.Student)
            {
                if (!_examinationRepository.CheckQuizInStudentClass(user.Id, id))
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
            if (!_examinationRepository.QuizDidByStudent(id))
            {
                return BadRequest(new ApiReponse(640));
            }
            if (!_examinationRepository.DeleteQuiz(getQuizById))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // POST asign-quiz-class
        // PUT quiz/5
        // POST submit-quiz/5
        // GET my-marks

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
