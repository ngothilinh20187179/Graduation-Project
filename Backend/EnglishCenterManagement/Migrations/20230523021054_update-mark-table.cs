﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishCenterManagement.Migrations
{
    /// <inheritdoc />
    public partial class updatemarktable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Marks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Point",
                table: "Marks",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Created",
                table: "Marks");

            migrationBuilder.DropColumn(
                name: "Point",
                table: "Marks");
        }
    }
}