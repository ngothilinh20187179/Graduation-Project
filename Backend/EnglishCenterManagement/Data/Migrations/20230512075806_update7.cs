using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishCenterManagement.Migrations
{
    /// <inheritdoc />
    public partial class update7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classes_Rooms_RoomId",
                table: "Classes");

            migrationBuilder.DropIndex(
                name: "IX_Classes_RoomId",
                table: "Classes");

            migrationBuilder.DropColumn(
                name: "PeriodEnd",
                table: "Classes");

            migrationBuilder.DropColumn(
                name: "PeriodStart",
                table: "Classes");

            migrationBuilder.RenameColumn(
                name: "RoomId",
                table: "Classes",
                newName: "NumberOfStudents");

            migrationBuilder.RenameColumn(
                name: "Number",
                table: "Classes",
                newName: "NumberOfSessions");

            migrationBuilder.RenameColumn(
                name: "ClassTitle",
                table: "Classes",
                newName: "ClassName");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ClassEndDate",
                table: "Classes",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "date");

            migrationBuilder.CreateTable(
                name: "ClassSchedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PeriodStart = table.Column<TimeSpan>(type: "time", nullable: false),
                    PeriodEnd = table.Column<TimeSpan>(type: "time", nullable: false),
                    DayOfWeek = table.Column<int>(type: "int", nullable: false),
                    ClassId = table.Column<int>(type: "int", nullable: false),
                    RoomId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassSchedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClassSchedules_Classes_ClassId",
                        column: x => x.ClassId,
                        principalTable: "Classes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClassSchedules_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClassSchedules_ClassId",
                table: "ClassSchedules",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_ClassSchedules_RoomId",
                table: "ClassSchedules",
                column: "RoomId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClassSchedules");

            migrationBuilder.RenameColumn(
                name: "NumberOfStudents",
                table: "Classes",
                newName: "RoomId");

            migrationBuilder.RenameColumn(
                name: "NumberOfSessions",
                table: "Classes",
                newName: "Number");

            migrationBuilder.RenameColumn(
                name: "ClassName",
                table: "Classes",
                newName: "ClassTitle");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ClassEndDate",
                table: "Classes",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "date",
                oldNullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "PeriodEnd",
                table: "Classes",
                type: "time",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "PeriodStart",
                table: "Classes",
                type: "time",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Classes_RoomId",
                table: "Classes",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Classes_Rooms_RoomId",
                table: "Classes",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
