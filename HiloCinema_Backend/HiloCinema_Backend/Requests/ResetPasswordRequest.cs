﻿namespace HiloCinema_Backend.Requests
{
    public class ResetPasswordRequest
    {
        public string Token { get;set; }
        public string NewPassword { get;set; }
    }
}
