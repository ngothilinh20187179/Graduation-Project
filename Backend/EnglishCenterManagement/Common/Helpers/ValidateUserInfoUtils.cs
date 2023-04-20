using System.Text.RegularExpressions;

namespace EnglishCenterManagement.Common.Helpers
{
    public class ValidateUserInfoUtils
    {
        public ValidateUserInfoUtils() { }
        public bool IsValidPhoneNumber(string phoneNumber)
        {
            Regex regexPhoneNumber = new Regex("^[0-9]+$");
            return regexPhoneNumber.IsMatch(phoneNumber);
        }
        
        // Minimum eight characters, at least one uppercase & lowercase letter and one number
        public bool IsValidPassword(string password)
        {
            Regex regexPassword = new Regex("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
            return regexPassword.IsMatch(password);
        }

        public bool IsValidEmail(string email)
        {
            Regex regexEmail = new Regex("^\\S+@\\S+\\.\\S+$");
            return regexEmail.IsMatch(email);
        }
    }
}
