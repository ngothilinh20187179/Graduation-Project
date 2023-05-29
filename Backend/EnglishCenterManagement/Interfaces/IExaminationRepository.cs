using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface IExaminationRepository
    {
        bool CreateNewQuiz(QuizModel newQuiz);
        bool UpdateQuiz(QuizModel quiz);
        ICollection<ClassModel> GetAssignedClasses(int quizId);
        ICollection<ClassModel> GetAssignableClasses(int quizId);
        bool CheckClassIdsNeedAssign(int quizId, List<int> listClassId);
        bool AssignQuizClass(int quizId, int classId);
        bool DeleteQuiz(QuizModel quiz);
        PagedResponse GetAllQuizzes(string? search, int page, int pageSize);
        PagedResponse GetMyQuizzes(string? search, int studentId, int page, int pageSize);
        QuizModel GetQuizById(int id);
        public string GetQuizNameById(int id);
        bool CheckQuizInStudentClass(int userId, int quizId);
        bool CheckStudentDidQuiz(int studentId, int quizId);
        QuestionModel GetQuestionById(int id);
        ICollection<int> GetListQuestionIdsByQuizId(int quizId);
        ICollection<QuestionModel> GetListQuestionByQuizId(int quizId);
        bool CheckQuizContainQuestionId(int questionId, int quizId);
        bool DeleteQuestion(QuestionModel question);
        bool CheckQuizContainAnswerId(int answerId, int questionId);
        ICollection<AnswerModel> GetAnwsersByQuestionId(int questionId);
        ICollection<int> GetListAnswerIdsTrue(int questionId);
        bool CreateMark(MarkModel mark);
        PagedResponse GetMarksByStudentId(int studentId, int page, int pageSize);
    }
}
