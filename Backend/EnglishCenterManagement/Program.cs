using EnglishCenterManagement.Data;
using EnglishCenterManagement.Interfaces;
using EnglishCenterManagement.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// . Allow all to call api
builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

// . Add AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// . Life cycle DI: AddSingleton(), AddTransient(), AddScoped()
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IClassRoomRepository, ClassRoomRepository>();
builder.Services.AddScoped<IAuthenticationRepository, AuthenticationRepository>();
builder.Services.AddScoped<IStaffRepository, StaffRepository>();
builder.Services.AddScoped<ISubjectRoomRepository, SubjectRoomRepository>();
builder.Services.AddScoped<ITeacherStudentRepository, TeacherStudentRepository>();
builder.Services.AddScoped<IExaminationRepository, ExaminationRepository>();

// . Add authorization each api
builder.Services.AddSwaggerGen(c =>
{

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Insert Your Token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Add DataContext
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

//. Config JWT Authentication https://www.c-sharpcorner.com/article/jwt-token-creation-authentication-and-authorization-in-asp-net-core-6-0-with-po/
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true, //you might want to validate the audience and issuer depending on your use case
        ValidateLifetime = true, //here we are saying that we care about the token's expiration date
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MY API");
    });
}

app.UseHttpsRedirection();

// . NOTE: Add UseAuthentication before UseAuthorization
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
