using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishCenterManagement.Migrations
{
    /// <inheritdoc />
    public partial class update2marktable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalPoint",
                table: "Marks",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalPoint",
                table: "Marks");
        }
    }
}
