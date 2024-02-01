selectedTab = null;
user_details = JSON.parse(localStorage.getItem("user_info"));
showloading = true;
service_id = undefined;
rowsPerPageItems = [2, 4, 6];
rowsPerPageActionItems = [4, 8, 12];
pagination = {
  rowsPerPage: 1,
};
paginationAction = {
  rowsPerPage: 10,
};
years = [
  {
    color: "cyan",
    year: "1",
  },
  {
    color: "green",
    year: "2",
  },
  {
    color: "pink",
    year: "3",
  },
];
var serviceDetails;
var service_id = window.location.href.split("/")[5];
console.log(service_id);
if (service_id == undefined || service_id == "") {
  var host = location.hostname;
  // console.log(host + ":5153/Home/Report");
  window.location.href = host + "/Home/Report";
}
var item = {
  success: true,
  message: "Services Retraived Successfully",
  services: [
    {
      id: 1,
      service_id: 1,
      name: "Indent Request Workflow",
      description: "Indent Request desc",
      created_by: 1,
      created_at: "2021-02-16T05:51:11.000Z",
      updated_at: "2021-02-17T11:37:13.000Z",
      status: "1",
      service_name: "Indent Request",
      actions: [
        {
          id: 105,
          service_id: 1,
          role_id: 2,
          amount: 0,
          created_at: "2022-04-13T03:26:03.000Z",
          updated_at: "2022-04-13T03:26:03.000Z",
          finish: "0",
          created_by: 1,
          TAT: 4,
          urgent_flag: 0,
          role: "Indent Manager",
        },
        {
          id: 106,
          service_id: 1,
          role_id: 19,
          amount: 10001,
          created_at: "2022-04-13T03:26:03.000Z",
          updated_at: "2022-04-13T03:26:03.000Z",
          finish: "0",
          created_by: 1,
          TAT: 4,
          urgent_flag: 0,
          role: "Sub HOD",
        },
        {
          id: 107,
          service_id: 1,
          role_id: 7,
          amount: 50001,
          created_at: "2022-04-13T03:26:03.000Z",
          updated_at: "2022-04-13T03:26:03.000Z",
          finish: "1",
          created_by: 1,
          TAT: 4,
          urgent_flag: 0,
          role: "HOD",
        },
      ],
    },
    {
      id: 2,
      service_id: 3,
      name: "Service Request",
      description: "Service Request workflow",
      created_by: 1,
      created_at: "2021-02-16T06:21:26.000Z",
      updated_at: "2021-02-16T06:21:26.000Z",
      status: "1",
      service_name: "Service Request",
      actions: [
        {
          id: 111,
          service_id: 3,
          role_id: 2,
          amount: null,
          created_at: "2023-04-20T08:38:00.000Z",
          updated_at: "2023-04-20T08:38:00.000Z",
          finish: "0",
          created_by: 1,
          TAT: 6,
          urgent_flag: 0,
          role: "Indent Manager",
        },
        {
          id: 112,
          service_id: 3,
          role_id: 7,
          amount: null,
          created_at: "2023-04-20T08:38:00.000Z",
          updated_at: "2023-04-20T08:38:00.000Z",
          finish: "1",
          created_by: 1,
          TAT: 6,
          urgent_flag: 0,
          role: "HOD",
        },
      ],
    },
    {
      id: 3,
      service_id: 2,
      name: "Urgent Indent Request",
      description: "Urgent Indent Request",
      created_by: 1,
      created_at: "2021-03-04T10:04:23.000Z",
      updated_at: "2021-03-04T10:05:09.000Z",
      status: "1",
      service_name: "Urgent Indent  Request",
      actions: [
        {
          id: 108,
          service_id: 2,
          role_id: 2,
          amount: 0,
          created_at: "2022-04-13T03:26:35.000Z",
          updated_at: "2022-04-13T03:26:35.000Z",
          finish: "0",
          created_by: 1,
          TAT: 4,
          urgent_flag: 1,
          role: "Indent Manager",
        },
        {
          id: 109,
          service_id: 2,
          role_id: 19,
          amount: 0,
          created_at: "2022-04-13T03:26:35.000Z",
          updated_at: "2022-04-13T03:26:35.000Z",
          finish: "0",
          created_by: 1,
          TAT: 4,
          urgent_flag: 1,
          role: "Sub HOD",
        },
        {
          id: 110,
          service_id: 2,
          role_id: 7,
          amount: null,
          created_at: "2022-04-13T03:26:35.000Z",
          updated_at: "2022-04-13T03:26:35.000Z",
          finish: "1",
          created_by: 1,
          TAT: 4,
          urgent_flag: 1,
          role: "HOD",
        },
      ],
    },
    {
      id: 4,
      service_id: 6,
      name: "Return request",
      description: "Testing",
      created_by: 1,
      created_at: "2021-03-16T05:29:38.000Z",
      updated_at: "2021-03-16T05:29:38.000Z",
      status: "1",
      service_name: null,
      actions: [
        {
          id: 51,
          service_id: 6,
          role_id: 2,
          amount: 0,
          created_at: "2021-03-16T05:29:38.000Z",
          updated_at: "2021-03-16T05:29:38.000Z",
          finish: "0",
          created_by: 1,
          TAT: 4,
          urgent_flag: null,
          role: "Indent Manager",
        },
        {
          id: 52,
          service_id: 6,
          role_id: 7,
          amount: null,
          created_at: "2021-03-16T05:29:38.000Z",
          updated_at: "2021-03-16T05:29:38.000Z",
          finish: "1",
          created_by: 1,
          TAT: 4,
          urgent_flag: 0,
          role: "HOD",
        },
      ],
    },
    {
      id: 5,
      service_id: 4,
      name: "Code Creation Request",
      description: "Code Creation Request",
      created_by: 1,
      created_at: "2021-03-19T08:39:24.000Z",
      updated_at: "2021-03-19T08:53:11.000Z",
      status: "1",
      service_name: "Code Creation Request",
      actions: [
        {
          id: 76,
          service_id: 4,
          role_id: 2,
          amount: 0,
          created_at: "2021-05-02T02:45:49.000Z",
          updated_at: "2021-05-02T02:45:49.000Z",
          finish: "0",
          created_by: 1,
          TAT: 4,
          urgent_flag: null,
          role: "Indent Manager",
        },
        {
          id: 77,
          service_id: 4,
          role_id: 9,
          amount: null,
          created_at: "2021-05-02T02:45:49.000Z",
          updated_at: "2021-05-02T02:45:49.000Z",
          finish: "0",
          created_by: 1,
          TAT: 4,
          urgent_flag: 0,
          role: "SD",
        },
        {
          id: 78,
          service_id: 4,
          role_id: 7,
          amount: null,
          created_at: "2021-05-02T02:45:49.000Z",
          updated_at: "2021-05-02T02:45:49.000Z",
          finish: "1",
          created_by: 1,
          TAT: 4,
          urgent_flag: 0,
          role: "HOD",
        },
      ],
    },
    {
      id: 6,
      service_id: 5,
      name: "Special Material Indent Request\t",
      description: "Special Material Indent Request\t",
      created_by: 1,
      created_at: "2022-02-04T14:56:11.000Z",
      updated_at: "2022-02-04T14:56:11.000Z",
      status: "1",
      service_name: "Special Material Indent Request",
      actions: [
        {
          id: 101,
          service_id: 5,
          role_id: 2,
          amount: 0,
          created_at: "2022-02-04T18:23:56.000Z",
          updated_at: "2022-02-04T18:23:56.000Z",
          finish: "0",
          created_by: 1,
          TAT: 4,
          urgent_flag: 0,
          role: "Indent Manager",
        },
        {
          id: 102,
          service_id: 5,
          role_id: 19,
          amount: 10001,
          created_at: "2022-02-04T18:23:56.000Z",
          updated_at: "2022-02-04T18:23:56.000Z",
          finish: "1",
          created_by: 1,
          TAT: 4,
          urgent_flag: 0,
          role: "Sub HOD",
        },
      ],
    },
  ],
};

function getServiceDetails() {
  $.ajax({
    url: host + path + "service_details?service_id=" + service_id,
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      serviceDetails = response.services;
      //console.log(serviceDetails);
      setalldata();
    },
    error: function (error) {
      console.error("Error creating data on user_store_locations:->>", error);
    },
  });
}

getServiceDetails();

function setalldata() {
  // set value
  $("#service_name_head").html(serviceDetails[0].service_name);
  $("#name").text(serviceDetails[0].name);
  $("#service_name").text(serviceDetails[0].service_name);
  $("#description").text(serviceDetails[0].description);
  $("#created_at").text(
    moment(serviceDetails[0].created_at).format("Do MMM YYYY , h:mm:ss a")
  );
  $("#updated_at").text(
    moment(serviceDetails[0].updated_at).format("Do MMM YYYY , h:mm:ss a")
  );
  var Actionbody = $("#Actionbody");
  var timelinebody = $("#timelinebody");
  console.log(serviceDetails[0].actions);
  serviceDetails[0].actions.forEach((element, index) => {
    var Action = ` 
        <div class="flex xs12 sm12 md6 lg4">
            <div class="v-card v-sheet theme--light">
            <div class="v-card__title">
                <h4>Action: ${index + 1}</h4>
            </div>
            <hr class="v-divider theme--light" />
            <div
                role="list"
                class="v-list v-list--dense theme--light"
            >
                <div role="listitem">
                <div class="v-list__tile theme--light">
                    <div class="v-list__tile__content">
                    Role :
                    </div>
                    <div
                    class="v-list__tile__content align-end"
                    >
                   ${element.role}
                    </div>
                </div>
                </div>
                <div role="listitem">
                <div class="v-list__tile theme--light">
                    <div class="v-list__tile__content">
                    Amount (Rs):
                    </div>
                    <div
                    class="v-list__tile__content align-end"
                    >
                    ${element.amount == null ? "" : element.amount}
                    </div>
                </div>
                </div>
                <div role="listitem">
                <div class="v-list__tile theme--light">
                    <div class="v-list__tile__content">
                    TAT (Hrs):
                    </div>
                    <div
                    class="v-list__tile__content align-end"
                    >
                    ${element.TAT}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>`;
    Actionbody.append(Action);

    var timeline = `
    <div class="v-timeline-item v-timeline-item--fill-dot theme--light">
        <div class="v-timeline-item__dot">
        <div class="v-timeline-item__inner-dot yellow">
            <span>${index + 1}</span>
        </div>
        </div>
        <div class="v-timeline-item__body">
        <div class="v-card v-sheet theme--dark yellow">
            <div class="v-card__text white text--primary">
            <div class="flex">
                Requires approval from
                <b>${element.role}</b>
            </div>
            <div class="flex" style="opacity: 0.6">
                TAT (Hrs):
                <b>${element.TAT == null ? "" : element.TAT}</b>
            </div>
            </div>
        </div>
        </div>
    </div>`;
    timelinebody.append(timeline);
  });
}
