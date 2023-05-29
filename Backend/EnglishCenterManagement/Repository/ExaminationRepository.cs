using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Data;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;

namespace EnglishCenterManagement.Repository
{
    public class ExaminationRepository : IExaminationRepository
    {
        private readonly DataContext _context;
        public ExaminationRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateNewQuiz(QuizModel newQuiz)
        {
            _context.Add(newQuiz);
            return SaveChange();
        }
        public bool UpdateQuiz(QuizModel quiz)
        {
            _context.Update(quiz);
            return SaveChange();
        }
        public ICollection<ClassModel> GetAssignedClasses(int quizId)
        {
            var listClassIds = _context.QuizClasses.Where(x => x.QuizId == quizId).Select(x => x.ClassId).ToList();
            return _context.Classes.Where(x => listClassIds.Contains(x.Id)).ToList();    
        }
        public ICollection<ClassModel> GetAssignableClasses(int quizId)
        {
            var listClassIds = _context.QuizClasses.Where(x => x.QuizId == quizId).Select(x => x.ClassId).ToList();
            return _context.Classes.Where(x => x.ClassStatus == ClassStatusType.InProgress && !listClassIds.Contains(x.Id)).ToList();
        }
        public bool CheckClassIdsNeedAssign(int quizId, List<int> listClassId)
        {
            var listAssignedClassIds = _context.QuizClasses.Where(x => x.QuizId == quizId).Select(x => x.ClassId).ToList();
            var listAssignableClassIds = _context.Classes.Where(x => x.ClassStatus == ClassStatusType.InProgress && !listAssignedClassIds.Contains(x.Id)).Select(x => x.Id).ToList();
            return listClassId.All(x => listAssignableClassIds.Contains(x));
        }
        public bool AssignQuizClass(int quizId, int classId)
        {
            var quizClassModel = new QuizClassModel
            {
                QuizId = quizId,
                ClassId = classId
            };
            _context.Add(quizClassModel);
            return SaveChange();
        }
        public bool DeleteQuiz(QuizModel quiz)
        {
            // xóa các ref trước => có thể config trong data context
            var quizClass = _context.QuizClasses.Where(x => x.QuizId == quiz.Id).FirstOrDefault();
            if (quizClass != null)
            {
                _context.QuizClasses.Remove(quizClass);
            }
            _context.Quizzes.Remove(quiz);
            return SaveChange();
        }
        public PagedResponse GetAllQuizzes(string? search, int page, int pageSize)
        {
            var allQuizzes = _context.Quizzes.AsQueryable();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allQuizzes = allQuizzes.Where(u => u.Name.Contains(search));
            }
            #endregion

            #region Sorting
            allQuizzes = allQuizzes.OrderByDescending(u => u.Created);
            #endregion

            #region Paginated
            var data = allQuizzes.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalClasses = allQuizzes.Count();
            #endregion

            return new PagedResponse(data, totalClasses, page, pageSize);
        }
        public PagedResponse GetMyQuizzes(string? search, int studentId, int page, int pageSize)
        {
            var enrolledClassIds = _context.StudentClasses.Where(x => x.StudentId == studentId).Select(x => x.ClassId).ToList();
            var quizIdsInClass = _context.QuizClasses.Where(x => enrolledClassIds.Contains(x.ClassId)).Select(x => x.QuizId).ToList();
            var myQuizzes = _context.Quizzes.Where(x => quizIdsInClass.Contains(x.Id)).AsQueryable();
           
            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                myQuizzes = myQuizzes.Where(u => u.Name.Contains(search));
            }
            #endregion

            #region Sorting
            myQuizzes = myQuizzes.OrderByDescending(u => u.Created);
            #endregion

            #region Paginated
            var data = myQuizzes.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalClasses = myQuizzes.Count();
            #endregion

            return new PagedResponse(data, totalClasses, page, pageSize);
        }
        public QuizModel GetQuizById(int id)
        {
            return _context.Quizzes.Where(x => x.Id == id).FirstOrDefault();
        }
        public string GetQuizNameById(int id)
        {
            return _context.Quizzes.Where(x => x.Id == id).Select(x => x.Name).FirstOrDefault();
        }
        public bool CheckQuizInStudentClass(int userId, int quizId)
        {
            var quizClassIds = _context.QuizClasses.Where(x => x.QuizId == quizId).Select(x => x.ClassId).ToList();
            return _context.StudentClasses.Any(x => quizClassIds.Contains(x.ClassId) && x.StudentId == userId);
        }
        public bool CheckStudentDidQuiz(int studentId, int quizId)
        {
            return _context.Marks.Any(x => x.StudentId == studentId && x.QuizId == quizId);
        }

        public QuestionModel GetQuestionById(int id)
        {
            return _context.Questions.Where(x => x.Id == id).FirstOrDefault();
        }
        public ICollection<QuestionModel> GetListQuestionByQuizId(int quizId)
        {
            return _context.Questions.Where(x => x.QuizId == quizId).ToList();
        }
        public ICollection<int> GetListQuestionIdsByQuizId(int quizId)
        {
            return _context.Questions.Where(x => x.QuizId == quizId).Select(x => x.Id).ToList();
        }
        public bool CheckQuizContainQuestionId(int questionId, int quizId)
        {
            var listQuestionId = _context.Questions.Where(x => x.QuizId == quizId).Select(x => x.Id).ToList();
            return listQuestionId.Contains(questionId);
        }
        public bool DeleteQuestion(QuestionModel question)
        {
            _context.Remove(question);
            return SaveChange();
        }

        public bool CheckQuizContainAnswerId(int answerId, int questionId)
        {
            var listAnswerId = _context.Answers.Where(x => x.QuestionId == questionId).Select(x => x.Id).ToList();
            return listAnswerId.Contains(answerId);
        }
        public ICollection<AnswerModel> GetAnwsersByQuestionId(int questionId)
        {
            return _context.Answers.Where(x => x.QuestionId == questionId).ToList();
        }
        public ICollection<int>GetListAnswerIdsTrue(int questionId)
        {
            return _context.Answers.Where(x => x.QuestionId == questionId && x.IsCorrect).Select(x => x.Id).ToList() ;
        }

        public bool CreateMark(MarkModel mark)
        {
            _context.Add(mark);
            return SaveChange();
        }
        public PagedResponse GetMarksByStudentId(int studentId, int page, int pageSize)
        {
            var marks = _context.Marks.Where(x => x.StudentId == studentId).AsQueryable();

            #region Sorting
            marks = marks.OrderByDescending(u => u.Created);
            #endregion

            #region Paginated
            var data = marks.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalClasses = marks.Count();
            #endregion

            return new PagedResponse(data, totalClasses, page, pageSize);
        }

        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
