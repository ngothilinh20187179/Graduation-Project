using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Data;
using EnglishCenterManagement.Dtos.ExaminationDtos;
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
            // get all quizIds from classIds
            // get all quiz basic info
            // check student did this quiz => status
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
        public bool CheckQuizInStudentClass(int userId, int quizId)
        {
            var quizClassIds = _context.QuizClasses.Where(x => x.QuizId == quizId).Select(x => x.ClassId).ToList();
            return _context.StudentClasses.Any(x => quizClassIds.Contains(x.ClassId) && x.StudentId == userId);
        }
        public ICollection<QuestionModel> GetListQuestionByQuizId(int quizId)
        {
            return _context.Questions.Where(x => x.QuizId == quizId).ToList();
        }
        public ICollection<AnswerModel> GetAnwsersByQuestionId(int questionId)
        {
            return _context.Answers.Where(x => x.QuestionId == questionId).ToList();
        }
        public bool CreateNewQuiz(QuizModel newQuiz)
        {
            _context.Add(newQuiz);
            return SaveChange();
        }
        public bool DeleteQuiz(QuizModel quiz)
        {
            _context.Quizzes.Remove(quiz);
            return SaveChange();
        }
        public bool QuizDidByStudent(int id)
        {
            return _context.Marks.Any(x => x.QuizId == id);
        }
        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
