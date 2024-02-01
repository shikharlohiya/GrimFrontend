namespace GrimLogin.Models
{
    public class ApiSettings
    {
        public required string BaseUrl { get; set; }
        public int Port1 { get; set; }
        public int Port2 { get; set; }
        public required string Endpoint1 { get; set; }
        public required string Endpoint2 { get; set; }
        public string QueryParameters { get; set; }
    }
}
