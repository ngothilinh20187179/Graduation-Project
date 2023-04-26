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
            [603] = "",
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

            [1000] = "You don't have permission to access"
        };
    }
}
