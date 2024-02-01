using GrimLogin.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace GrimLogin.Controllers
{
    public class resetController : Controller
    {
        private readonly ApiSettings _apiSettings;

        public resetController(IOptions<ApiSettings> apiSettings)
        {
            _apiSettings = apiSettings.Value;
        }

        private dynamic GetApiUrls()
        {
            // Construct the all API URL using Port1 and Endpoint1
            string apiUrl1 = $"{_apiSettings.BaseUrl}:{_apiSettings.Port1}{_apiSettings.Endpoint1}{_apiSettings.QueryParameters}";
            string apiUrl2 = $"{_apiSettings.BaseUrl}:{_apiSettings.Port2}{_apiSettings.Endpoint2}{_apiSettings.QueryParameters}";
            string BaseUrl = $"{_apiSettings.BaseUrl}:";
            string Port1 = $"{_apiSettings.Port1}";
            string Port2 = $"{_apiSettings.Port2}";
            string Endpoint1 = $"{_apiSettings.Endpoint1}";
            string Endpoint2 = $"{_apiSettings.Endpoint2}";

            // Create an anonymous object to hold the API URLs
            var apiUrls = new
            {
                ApiUrl1 = apiUrl1,
                ApiUrl2 = apiUrl2,
                BaseUrl = BaseUrl,
                Port1 = Port1,
                Port2 = Port2,
                Endpoint1 = Endpoint1,
                Endpoint2 = Endpoint2,
            };

            return apiUrls;
        }
        public IActionResult Index()
        {
            var apiUrls = GetApiUrls();
            return View(apiUrls);
        }
    }
}
