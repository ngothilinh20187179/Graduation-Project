using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishCenterManagement.Migrations
{
    /// <inheritdoc />
    public partial class updateteacherclasstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Note",
                table: "TeacherClasses");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "TeacherClasses",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
