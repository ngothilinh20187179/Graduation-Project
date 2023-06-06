using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishCenterManagement.Migrations
{
    /// <inheritdoc />
    public partial class updatedatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PeriodEnd",
                table: "ClassSchedules");

            migrationBuilder.DropColumn(
                name: "PeriodStart",
                table: "ClassSchedules");

            migrationBuilder.DropColumn(
                name: "NumberOfSessions",
                table: "Classes");

            migrationBuilder.AddColumn<int>(
                name: "Period",
                table: "ClassSchedules",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Period",
                table: "ClassSchedules");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "PeriodEnd",
                table: "ClassSchedules",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "PeriodStart",
                table: "ClassSchedules",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<int>(
                name: "NumberOfSessions",
                table: "Classes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
