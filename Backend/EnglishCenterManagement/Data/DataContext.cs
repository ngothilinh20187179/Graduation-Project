using EnglishCenterManagement.Common.Helpers;
using EnglishCenterManagement.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace EnglishCenterManagement.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<UserInfoModel> Users { get; set; }
        public DbSet<RefreshTokenModel> Tokens { get; set; }
        public DbSet<AvatarModel> Avatars { get; set; }

        public DbSet<SubjectModel> Subjects { get; set; }
        public DbSet<ClassModel> Classes { get; set; }
        public DbSet<RoomModel> Rooms { get; set; }
        public DbSet<StaffModel> Staffs { get; set; }
        public DbSet<StudentModel> Students { get; set; }
        public DbSet<TeacherModel> Teachers { get; set; }
        public DbSet<StudentClassModel> StudentClasses { get; set; }
        public DbSet<TeacherClassModel> TeacherClasses { get; set; }

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
                    .HasKey(pc => new { pc.StudentId, pc.ClassId });
            modelBuilder.Entity<StudentClassModel>()
                    .HasOne(p => p.Student)
                    .WithMany(pc => pc.StudentClasses)
                    .HasForeignKey(p => p.StudentId);
            modelBuilder.Entity<StudentClassModel>()
                    .HasOne(p => p.Class)
                    .WithMany(pc => pc.StudentClasses)
                    .HasForeignKey(c => c.ClassId);

            // n-n relationship Teacher-Class
            modelBuilder.Entity<TeacherClassModel>()
                    .HasKey(pc => new { pc.TeacherId, pc.ClassId });
            modelBuilder.Entity<TeacherClassModel>()
                    .HasOne(p => p.Teacher)
                    .WithMany(pc => pc.TeacherClasses)
                    .HasForeignKey(p => p.TeacherId);
            modelBuilder.Entity<TeacherClassModel>()
                    .HasOne(p => p.Class)
                    .WithMany(pc => pc.TeacherClasses)
                    .HasForeignKey(c => c.ClassId);

            // 1-n Subject-Class
            modelBuilder.Entity<ClassModel>()
                .HasOne(x => x.Subject)
                .WithMany(x => x.Classes);

            // 1-n Room-Class
            modelBuilder.Entity<ClassModel>()
                .HasOne(x => x.Room)
                .WithMany(x => x.Classes);
        }
    }
}
