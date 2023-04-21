using EnglishCenterManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace EnglishCenterManagement.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<UserInfoModel> Users { get; set; }
        public DbSet<RefreshTokenModel> Tokens { get; set; }
        public DbSet<AvatarModel> Avatars { get; set; }

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
        }
    }
}
