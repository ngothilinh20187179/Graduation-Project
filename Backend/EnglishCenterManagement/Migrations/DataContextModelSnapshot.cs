﻿// <auto-generated />
using System;
using EnglishCenterManagement.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EnglishCenterManagement.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.AnswerModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AnswerText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("bit");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.AvatarModel", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<byte[]>("Data")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("MediaType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Avatars");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.ClassModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("ClassEndDate")
                        .HasColumnType("date");

                    b.Property<string>("ClassName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ClassStartDate")
                        .HasColumnType("date");

                    b.Property<int>("ClassStatus")
                        .HasColumnType("int");

                    b.Property<double>("Credit")
                        .HasColumnType("float");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfSessions")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfStudents")
                        .HasColumnType("int");

                    b.Property<int>("SubjectId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SubjectId");

                    b.ToTable("Classes");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.ClassScheduleModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ClassId")
                        .HasColumnType("int");

                    b.Property<int>("DayOfWeek")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("PeriodEnd")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("PeriodStart")
                        .HasColumnType("time");

                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ClassId");

                    b.HasIndex("RoomId");

                    b.ToTable("ClassSchedules");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.MarkModel", b =>
                {
                    b.Property<int>("StudentId")
                        .HasColumnType("int");

                    b.Property<int>("QuizId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<int>("Point")
                        .HasColumnType("int");

                    b.Property<int>("TotalPoint")
                        .HasColumnType("int");

                    b.HasKey("StudentId", "QuizId");

                    b.HasIndex("QuizId");

                    b.ToTable("Marks");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.QuestionModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.Property<int>("Point")
                        .HasColumnType("int");

                    b.Property<string>("QuestionText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QuizId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuizId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.QuizClassModel", b =>
                {
                    b.Property<int>("QuizId")
                        .HasColumnType("int");

                    b.Property<int>("ClassId")
                        .HasColumnType("int");

                    b.HasKey("QuizId", "ClassId");

                    b.HasIndex("ClassId");

                    b.ToTable("QuizClasses");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.QuizModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<TimeSpan>("Duration")
                        .HasColumnType("time");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("TeacherId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TeacherId");

                    b.ToTable("Quizzes");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.RefreshTokenModel", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<DateTime>("ExpiredAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("IssuedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.RoomModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoomStatus")
                        .HasColumnType("int");

                    b.Property<int?>("Size")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.StaffModel", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("GraduateAt")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("GraduationTime")
                        .HasColumnType("date");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Staffs");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.StudentClassModel", b =>
                {
                    b.Property<int>("StudentId")
                        .HasColumnType("int");

                    b.Property<int>("ClassId")
                        .HasColumnType("int");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PaidTuition")
                        .HasColumnType("bit");

                    b.HasKey("StudentId", "ClassId");

                    b.HasIndex("ClassId");

                    b.ToTable("StudentClasses");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.StudentModel", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ParentPhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ParentsName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.SubjectModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SubjectDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SubjectName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SubjectStatus")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Subjects");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.TeacherClassModel", b =>
                {
                    b.Property<int>("TeacherId")
                        .HasColumnType("int");

                    b.Property<int>("ClassId")
                        .HasColumnType("int");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TeacherId", "ClassId");

                    b.HasIndex("ClassId");

                    b.ToTable("TeacherClasses");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.TeacherModel", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("GraduateAt")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("GraduationTime")
                        .HasColumnType("date");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Teachers");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.UserInfoModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Gender")
                        .HasColumnType("int");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LoginName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<int>("UserStatus")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.AnswerModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.QuestionModel", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Question");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.AvatarModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.UserInfoModel", "User")
                        .WithOne("Avatar")
                        .HasForeignKey("EnglishCenterManagement.Entities.Models.AvatarModel", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.ClassModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.SubjectModel", "Subject")
                        .WithMany("Classes")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Subject");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.ClassScheduleModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.ClassModel", "Class")
                        .WithMany("ClassSchedules")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EnglishCenterManagement.Entities.Models.RoomModel", "Room")
                        .WithMany("ClassSchedules")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Class");

                    b.Navigation("Room");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.MarkModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.QuizModel", "Quiz")
                        .WithMany("Marks")
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("EnglishCenterManagement.Entities.Models.StudentModel", "Student")
                        .WithMany("Marks")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Quiz");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.QuestionModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.QuizModel", "Quiz")
                        .WithMany("Questions")
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Quiz");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.QuizClassModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.ClassModel", "Class")
                        .WithMany("QuizzClasses")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("EnglishCenterManagement.Entities.Models.QuizModel", "Quiz")
                        .WithMany("QuizzClasses")
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Class");

                    b.Navigation("Quiz");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.QuizModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.TeacherModel", "Teacher")
                        .WithMany("Quizzes")
                        .HasForeignKey("TeacherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.RefreshTokenModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.UserInfoModel", "User")
                        .WithOne("Token")
                        .HasForeignKey("EnglishCenterManagement.Entities.Models.RefreshTokenModel", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.StaffModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.UserInfoModel", "User")
                        .WithOne("Staff")
                        .HasForeignKey("EnglishCenterManagement.Entities.Models.StaffModel", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.StudentClassModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.ClassModel", "Class")
                        .WithMany("StudentClasses")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EnglishCenterManagement.Entities.Models.StudentModel", "Student")
                        .WithMany("StudentClasses")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Class");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.StudentModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.UserInfoModel", "User")
                        .WithOne("Student")
                        .HasForeignKey("EnglishCenterManagement.Entities.Models.StudentModel", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.TeacherClassModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.ClassModel", "Class")
                        .WithMany("TeacherClasses")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EnglishCenterManagement.Entities.Models.TeacherModel", "Teacher")
                        .WithMany("TeacherClasses")
                        .HasForeignKey("TeacherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Class");

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.TeacherModel", b =>
                {
                    b.HasOne("EnglishCenterManagement.Entities.Models.UserInfoModel", "User")
                        .WithOne("Teacher")
                        .HasForeignKey("EnglishCenterManagement.Entities.Models.TeacherModel", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.ClassModel", b =>
                {
                    b.Navigation("ClassSchedules");

                    b.Navigation("QuizzClasses");

                    b.Navigation("StudentClasses");

                    b.Navigation("TeacherClasses");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.QuestionModel", b =>
                {
                    b.Navigation("Answers");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.QuizModel", b =>
                {
                    b.Navigation("Marks");

                    b.Navigation("Questions");

                    b.Navigation("QuizzClasses");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.RoomModel", b =>
                {
                    b.Navigation("ClassSchedules");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.StudentModel", b =>
                {
                    b.Navigation("Marks");

                    b.Navigation("StudentClasses");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.SubjectModel", b =>
                {
                    b.Navigation("Classes");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.TeacherModel", b =>
                {
                    b.Navigation("Quizzes");

                    b.Navigation("TeacherClasses");
                });

            modelBuilder.Entity("EnglishCenterManagement.Entities.Models.UserInfoModel", b =>
                {
                    b.Navigation("Avatar");

                    b.Navigation("Staff");

                    b.Navigation("Student");

                    b.Navigation("Teacher");

                    b.Navigation("Token");
                });
#pragma warning restore 612, 618
        }
    }
}
