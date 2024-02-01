using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using GrimLogin.Models;
using Microsoft.Extensions.Options;

namespace GrimLogin.Controllers.Home;

public class HomeController : Controller
{
    //private readonly ILogger<HomeController> _logger;

    //public HomeController(ILogger<HomeController> logger)
    //{
    //    _logger = logger;
    //}
    private readonly ApiSettings _apiSettings;

    public HomeController(IOptions<ApiSettings> apiSettings)
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

    public IActionResult MyProfile()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult MyRequests()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult NewIndent()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Notifications()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult NewPurchaseReq()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Servicerequest()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Vendors()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Cart()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult MyApprovals()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Itemmaterials()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Newmaterialrequest()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Returns()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Locations()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Report()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult CreateUser()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Wbs()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Roles()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Departments()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Special_materials()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Workflow()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Assets()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult My_Issues()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Cost_centers()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult IndentDetails()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Returnsdata()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Test()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Pr_materials()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult Workflow_details()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
    public IActionResult NewProductList()
    {
        var apiUrls = GetApiUrls();
        return View(apiUrls);
    }
  



    // [Route("Home/{statusCode}")]
    // public IActionResult NotFoundPageHandler(int statusCode)
    // {
    //     switch (statusCode)
    //     {
    //         case 404:
    //             ViewBag.ErrorMsg = "sorry, page not found";
    //             break;
    //         default:
    //             break;
    //     }
    //     return View("NotFound");
    // }


    // "ASPNETCORE_ENVIRONMENT": "Development"
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
