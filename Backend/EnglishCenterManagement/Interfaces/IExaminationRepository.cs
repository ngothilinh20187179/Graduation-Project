using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.ExaminationDtos;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface IExaminationRepository
    {
        PagedResponse GetAllQuizzes(string? search, int page, int pageSize);
        PagedResponse GetMyQuizzes(string? search, int studentId, int page, int pageSize);
        QuizModel GetQuizById(int id);
        bool CheckQuizInStudentClass(int userId, int quizId);
        ICollection<QuestionModel> GetListQuestionByQuizId(int quizId);
        ICollection<AnswerModel> GetAnwsersByQuestionId(int questionId);
        bool CreateNewQuiz(QuizModel newQuiz);
        bool DeleteQuiz(QuizModel quiz);
        bool QuizDidByStudent(int id);
    }
}
