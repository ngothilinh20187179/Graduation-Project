using AutoMapper;
using EnglishCenterManagement.Dtos.AuthenticationDtos;
using EnglishCenterManagement.Dtos.ClassRoomDto;
using EnglishCenterManagement.Dtos.ExaminationDtos;
using EnglishCenterManagement.Dtos.SchoolDto;
using EnglishCenterManagement.Dtos.SchoolRoomDto;
using EnglishCenterManagement.Dtos.TeacherStudentStaffDto;
using EnglishCenterManagement.Dtos.UserInfoDto;
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

            CreateMap<RoomModel, RoomDto>();
            CreateMap<CreateUpdateRoomDto, RoomModel>();
            CreateMap<SubjectModel, SubjectDto>();
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
            CreateMap<CreateMarkDto, MarkModel>();
            CreateMap<ClassModel, AssignClassDto>();
        }
    }
}
