using AutoMapper;
using EnglishCenterManagement.Dtos.AuthenticationDtos;
using EnglishCenterManagement.Dtos.ClassRoomDtos;
using EnglishCenterManagement.Dtos.ExaminationDtos;
using EnglishCenterManagement.Dtos.FinanceDtos;
using EnglishCenterManagement.Dtos.NotificationsDtos;
using EnglishCenterManagement.Dtos.PositionPermissionDtos;
using EnglishCenterManagement.Dtos.SubjectRoomDtos;
using EnglishCenterManagement.Dtos.TeacherStudentStaffDtos;
using EnglishCenterManagement.Dtos.UserInfoDtos;
using EnglishCenterManagement.Entities.FinanceDtos;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Data
{
    public class DefaultMapping : Profile
    {
        public DefaultMapping()
        {
            CreateMap<RefreshTokenDto, RefreshTokenModel>();
            CreateMap<AvatarModel, AvatarDto>();
            CreateMap<UserInfoModel, RoleDto>();
            CreateMap<RoleDto, UserInfoModel>();
            CreateMap<ChangePasswordDto, UserInfoModel>();
            CreateMap<EditUserInfo, UserInfoModel>();
            CreateMap<RegisterDto, UserInfoModel>();
            CreateMap<UserInfoDto, UserInfoModel>();
            CreateMap<UserInfoModel, UserInfoDto>();
            CreateMap<UserInfoModel, BasicUserInfoDto>();
            CreateMap<UserInfoModel, UserProfileDetailDto>();

            CreateMap<UserInfoModel, StudentProfileDetailDto>().ReverseMap();
            CreateMap<UserInfoModel, TeacherProfileDetailDto>().ReverseMap();
            CreateMap<UserInfoModel, StaffProfileDetailDto>().ReverseMap();
            CreateMap<StudentModel, StudentProfileDetailDto>().ReverseMap();
            CreateMap<TeacherModel, TeacherProfileDetailDto>().ReverseMap();
            CreateMap<StaffModel, StaffProfileDetailDto>().ReverseMap();
            CreateMap<CreateStudentDto, StudentModel>();
            CreateMap<CreateTeacherDto, TeacherModel>();
            CreateMap<CreateStaffDto, StaffModel>();
            CreateMap<EditStaffDto, StaffModel>();
            CreateMap<EditStaffDto, UserInfoModel>();
            CreateMap<EditTeacherDto, TeacherModel>();
            CreateMap<EditTeacherDto, UserInfoModel>();
            CreateMap<EditStudentDto, StudentModel>();
            CreateMap<EditStudentDto, UserInfoModel>();
            CreateMap<UserInfoModel, BasicStaffInfoDto>();

            CreateMap<RoomModel, RoomDto>();
            CreateMap<CreateUpdateRoomDto, RoomModel>();
            CreateMap<SubjectModel, SubjectDto>();
            CreateMap<SubjectModel, BasicSubjectDto>();
            CreateMap<CreateUpdateSubjectDto, SubjectModel>();

            CreateMap<ClassModel, BasicClassRoomInfoDto>();
            CreateMap<ClassModel, ClassRoomDetailDto>();
            CreateMap<ClassScheduleModel, ClassScheduleDto>();
            CreateMap<CreateClassDto, ClassModel>();
            CreateMap<CreateClassScheduleDto, ClassScheduleModel>();
            CreateMap<QuizModel, BasicQuizInfoDto>();
            CreateMap<QuizModel, QuizDetailDto>();
            CreateMap<QuestionModel, QuestionDto>();
            CreateMap<AnswerModel, AnswerDto>();
            CreateMap<CreateQuizDto, QuizModel>();
            CreateMap<CreateQuestionDto, QuestionModel>();
            CreateMap<CreateAnswerDto, AnswerModel>();
            CreateMap<MarkModel, MarkDto>();
            CreateMap<MarkModel, QuizMarkDto>();
            CreateMap<CreateMarkDto, MarkModel>();
            CreateMap<ClassModel, AssignClassDto>();

            CreateMap<NotificationModel, ReceivedNotificationDto>();
            CreateMap<NotificationModel, ReceivedNotificationDetailDto>();
            CreateMap<NotificationModel, SentNotificationDetailDto>();
            CreateMap<NotificationModel, SentNotificationDto>();
            CreateMap<UserInfoModel, ReceiversNotificationDto>();
            CreateMap<CreateNotificationDto, NotificationModel>();
            CreateMap<UserInfoModel, UserNotificationDto>();

            CreateMap<PositionModel, BasicPositionDto>();
            CreateMap<PositionModel, PositionInfoDto>();
            CreateMap<CreateUpdatePositionDto, PositionModel>();
            CreateMap<PermissionModel, BasicPermissionDto>();
            CreateMap<PermissionPositionDto, PermissionPositionModel>();

            CreateMap<SpendingModel, SpendingDto>();
            CreateMap<CreateUpdateSpendingDto, SpendingModel>();
            CreateMap<StudentClassModel, MyTuitionDebtInformationDto>();
            CreateMap<StudentClassModel, StudentTuitionInformationDto>();
            CreateMap<TeacherSalaryModel, TeacherSalaryDto>();
            CreateMap<StaffSalaryModel, StaffSalaryDto>();
        }
    }
}
