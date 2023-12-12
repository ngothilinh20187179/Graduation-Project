namespace EnglishCenterManagement.Common.Messages
{
    public class ApiReponse
    {
        public string? Message { get; set; }
        public string? Code { get; set; }
        public object? Data { get; set; }
        public ApiReponse(int code)
        {
            Code = code.ToString();
            Message = GetMessage(code);
        }
        public ApiReponse(object data)
        {
            Data = data;
        }
        public static string GetMessage(int code)
            => _responses.TryGetValue(code, out string? message) ? message : "Unknown error.";
        
        private static readonly Dictionary<int, string> _responses = new()
        {
            [600] = "Client request is invalid",
            [601] = "Access token is invalid",
            [602] = "Access token has not yet expired",
            [603] = "Token not exists",
            [604] = "Refresh token is invalid",
            [605] = "Refresh token expired",
            [606] = "User not exist",
            [607] = "UserName exists",
            [608] = "User already exists",
            [609] = "Password and username cannot be the same",
            [610] = "Wrong password",
            [611] = "Password is invalid: Minimum eight characters, at least one uppercase & lowercase letter and one number",
            [612] = "Password and confirm password does not match",
            [613] = "Password and old password cannot be the same",
            [614] = "PhoneNumber is invalid",
            [615] = "Email is invalid",
            [616] = "Email already exists",
            [617] = "Gender is invalid",
            [618] = "Id mismatch",
            [619] = "Role type is invalid",
            [620] = "You don't have permission to delete yourself",
            [621] = "You don't have permission to change your role",
            [622] = "This user had role",
            [623] = "Not an image or invalid image",
            [624] = "The file is too large (>1MB)",
            [625] = "Avatar not exists",
            [626] = "Class not exists",
            [627] = "Subject already exists",
            [628] = "Suject status is invalid",
            [629] = "Subject not exists",
            [630] = "Subject has used by class",
            [631] = "Room already exists",
            [632] = "Room status is invalid",
            [633] = "Room not exists",
            [634] = "Room has used by class",
            [635] = "Student not exists",
            [636] = "Teacher not exists",
            [637] = "Date of birth is invalid",
            [638] = "Staff not exists",
            [639] = "Quiz not exists",
            [640] = "There are students taking this quiz so you can't remove it",
            [641] = "There are students taking this quiz so you can't update it",
            [642] = "You did this quiz",
            [643] = "These assign classes are invalid",
            [644] = "You don't have permission to restricted yourself",
            [645] = "ClassName exists",
            [646] = "Same schedule",
            [647] = "Admin not exists",
            [648] = "Notification not exists",
            [649] = "You are not receiver of this notification",
            [650] = "Position not exists",
            [651] = "Position already exists",
            [652] = "Permission not exists",

            [999] = "Your account has been locked",
            [1000] = "You don't have permission to access"
        };
    }
}
