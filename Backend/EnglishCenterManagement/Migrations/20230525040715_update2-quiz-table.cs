﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishCenterManagement.Migrations
{
    /// <inheritdoc />
    public partial class update2quiztable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Quizzes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Quizzes");
        }
    }
}
