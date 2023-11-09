using EnglishCenterManagement.Common.Helpers;
using EnglishCenterManagement.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace EnglishCenterManagement.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<UserInfoModel> Users { get; set; }
        public DbSet<RefreshTokenModel> Tokens { get; set; }
        public DbSet<AvatarModel> Avatars { get; set; }
        public DbSet<StaffModel> Staffs { get; set; }
        public DbSet<StudentModel> Students { get; set; }
        public DbSet<TeacherModel> Teachers { get; set; }

        public DbSet<SubjectModel> Subjects { get; set; }
        public DbSet<RoomModel> Rooms { get; set; }
        public DbSet<ClassModel> Classes { get; set; }
        public DbSet<ClassScheduleModel> ClassSchedules { get; set; }

        public DbSet<QuizModel> Quizzes { get; set; }
        public DbSet<QuestionModel> Questions { get; set; }
        public DbSet<AnswerModel> Answers { get; set; }

        public DbSet<TeacherClassModel> TeacherClasses { get; set; }
        public DbSet<StudentClassModel> StudentClasses { get; set; }
        public DbSet<QuizClassModel> QuizClasses { get; set; }
        public DbSet<MarkModel> Marks { get; set; }

        public DbSet<PermissionModel> Permissions { get; set; }
        public DbSet<PositionModel> Positions { get; set; }
        public DbSet<PermissionPositionModel> PermissionPositions { get; set; }
        public DbSet<SpendingModel> Spendings { get; set; }
        public DbSet<StaffAttendanceModel> StaffAttendances { get; set; }
        public DbSet<StudentAttendanceModel> StudentAttendances { get; set; }
        public DbSet<TeacherAttendanceModel> TeacherAttendances { get; set; }
        public DbSet<StaffSalaryModel> StaffSalaries { get; set; }
        public DbSet<TeacherSalaryModel> TeacherSalaries { get; set; }
        public DbSet<NotificationModel> Notifications { get; set; }

        protected override void ConfigureConventions(ModelConfigurationBuilder modelConfigureBuilder)
        {
            // Support "TimeOnly" and "DateOnly" type in ClassModel
            modelConfigureBuilder.Properties<DateOnly>()
                .HaveConversion<DateOnlyConverter>()
                .HaveColumnType("date");

            modelConfigureBuilder.Properties<TimeOnly>()
                .HaveConversion<TimeOnlyConverter>()
                .HaveColumnType("time");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 1-1 relationship User-Avatar 
            modelBuilder.Entity<UserInfoModel>()
                .HasOne(x => x.Avatar)
                .WithOne(x => x.User)
                .HasForeignKey<AvatarModel>(x => x.Id);

            // 1-1 relationship User-Token
            modelBuilder.Entity<UserInfoModel>()
                .HasOne(x => x.Token)
                .WithOne(x => x.User)
                .HasForeignKey<RefreshTokenModel>(x => x.Id);

            // 1-1 relationship User-Student
            modelBuilder.Entity<UserInfoModel>()
                .HasOne(x => x.Student)
                .WithOne(x => x.User)
                .HasForeignKey<StudentModel>();

            // 1-1 relationship User-Teacher
            modelBuilder.Entity<UserInfoModel>()
                .HasOne(x => x.Teacher)
                .WithOne(x => x.User)
                .HasForeignKey<TeacherModel>();

            // 1-1 relationship User-Staff
            modelBuilder.Entity<UserInfoModel>()
                .HasOne(x => x.Staff)
                .WithOne(x => x.User)
                .HasForeignKey<StaffModel>();

            // n-n relationship Student-Class
            modelBuilder.Entity<StudentClassModel>()
                .HasKey(x => new { x.Id });
            modelBuilder.Entity<StudentClassModel>()
                .HasOne(x => x.Student)
                .WithMany(x => x.StudentClasses)
                .HasForeignKey(x => x.StudentId);
            modelBuilder.Entity<StudentClassModel>()
                .HasOne(x => x.Class)
                .WithMany(x => x.StudentClasses)
                .HasForeignKey(x => x.ClassId);

            // n-n relationship Teacher-Class
            modelBuilder.Entity<TeacherClassModel>()
                .HasKey(x => new { x.Id });
            modelBuilder.Entity<TeacherClassModel>()
                .HasOne(x => x.Teacher)
                .WithMany(x => x.TeacherClasses)
                .HasForeignKey(x => x.TeacherId);
            modelBuilder.Entity<TeacherClassModel>()
                .HasOne(x => x.Class)
                .WithMany(x => x.TeacherClasses)
                .HasForeignKey(x => x.ClassId);

            // n-n relationship Quiz-Class
            modelBuilder.Entity<QuizClassModel>()
               .HasKey(x => new { x.Id });
            modelBuilder.Entity<QuizClassModel>()
                .HasOne(x => x.Quiz)
                .WithMany(x => x.QuizzClasses)
                .HasForeignKey(x => x.QuizId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<QuizClassModel>()
                .HasOne(x => x.Class)
                .WithMany(x => x.QuizzClasses)
                .HasForeignKey(x => x.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            // n-n relationship Quiz-Student
            modelBuilder.Entity<MarkModel>()
               .HasKey(x => new { x.Id });
            modelBuilder.Entity<MarkModel>()
                .HasOne(x => x.Student)
                .WithMany(x => x.Marks)
                .HasForeignKey(x => x.StudentId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<MarkModel>()
                .HasOne(x => x.Quiz)
                .WithMany(x => x.Marks)
                .HasForeignKey(x => x.QuizId)
                .OnDelete(DeleteBehavior.Restrict);

            // n-n relationship Position-Permission
            modelBuilder.Entity<PermissionPositionModel>()
                .HasKey(x => new { x.Id });
            modelBuilder.Entity<PermissionPositionModel>()
                .HasOne(x => x.Position)
                .WithMany(x => x.PermissionPositions)
                .HasForeignKey(x => x.PositionId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<PermissionPositionModel>()
                .HasOne(x => x.Permission)
                .WithMany(x => x.PermissionPositions)
                .HasForeignKey(x => x.PermissionId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
