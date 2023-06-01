import { Board } from "../Types/KanbanBoard.types";

export const ApiMockResponse: Board[] = [
  {
    name: "Backlog",
    items: [
      {
        id: "5f874252-6200-422e-9c2f-56b5f03b3840",
        priority: 0,
        title: "Update the user profile page layout",
        chat: 4,
        attachment: 0,
        assignees: [
          {
            avatar: "https://randomuser.me/api/portraits/men/20.jpg",
            name: "Alex Ander",
          },
        ],
      },
      {
        id: "bf35d1d7-772e-4a35-96d6-6435be47d3a9",
        priority: 2,
        title: "Implement two-factor authentication for login",
        chat: 1,
        attachment: 0,
        assignees: [
          {
            avatar: "https://randomuser.me/api/portraits/men/50.jpg",
            name: "Peter Silie",
          },
        ],
      },
      {
        id: "e447dff7-53de-4198-9117-23f06f58aeaa",
        priority: 1,
        title: "Fix the broken image links on the product detail pages",
        chat: 0,
        attachment: 0,
        assignees: [
          {
            avatar: "https://randomuser.me/api/portraits/men/20.jpg",
            name: "Alex Ander",
          },
        ],
      },
    ],
  },
  {
    name: "In Progress",
    items: [
      {
        id: "d5249b81-14e4-4d04-a682-9d7915d9b75f",
        priority: 1,
        title: "Fix the pagination issue on the search results page",
        chat: 3,
        attachment: 1,
        assignees: [
          {
            avatar: "https://randomuser.me/api/portraits/men/80.jpg",
            name: "Anna Bolika",
          },
        ],
      },
      {
        id: "caa6b39e-d1ff-40b3-aa85-68626b0bae2a",
        priority: 0,
        title: "Update the checkout process to support guest users",
        chat: 0,
        attachment: 0,
        assignees: [
          {
            avatar: "https://randomuser.me/api/portraits/men/60.jpg",
            name: "Max Mustermann",
          },
        ],
      },
    ],
  },
  {
    name: "In Review",
    items: [
      {
        id: "74dd4998-7fa1-4381-9b61-8b10eeb3cb94",
        priority: 2,
        title: "Write unit tests for the shopping cart functionality",
        chat: 16,
        attachment: 4,
        assignees: [
          {
            avatar: "https://randomuser.me/api/portraits/men/20.jpg",
            name: "Alex Ander",
          },
        ],
      },
      {
        id: "f3148605-62e5-4efb-8000-c9e2f47b1d8e",
        priority: 0,
        title: "Create a new landing page for a marketing campaign",
        chat: 0,
        attachment: 0,
        assignees: [
          {
            avatar: "https://randomuser.me/api/portraits/men/60.jpg",
          },
        ],
      },
    ],
  },
  {
    name: "Completed",
    items: [
      {
        id: "45bc2f0a-90fe-4df3-8f45-41903b5b8106",
        priority: 0,
        title: "Migrate the database to a new server",
        chat: 13,
        attachment: 2,
        assignees: [
          {
            avatar: "https://randomuser.me/api/portraits/men/50.jpg",
            name: "Peter Silie",
          },
        ],
      },
      {
        id: "d94f1ae2-e91c-4399-bd62-96872b7d4688",
        priority: 1,
        title: "Add support for multiple languages",
        chat: 0,
        attachment: 0,
        assignees: [
          {
            avatar: "https://randomuser.me/api/portraits/men/60.jpg",
            name: "Max Mustermann",
          },
        ],
      },
      {
        id: "6f31421a-45fd-415e-807d-44c5f3e94fce",
        priority: 1,
        title: "Improve the performance of the search algorithm",
        chat: 2,
        attachment: 2,
        assignees: [
          {
            avatar: "https://randomuser.me/api/portraits/men/20.jpg",
            name: "Alex Ander",
          },
        ],
      },
      {
        id: "101a6a83-426b-4387-88cd-7f423ab5d429",
        priority: 2,
        title: "Update the payment gateway integration",
        chat: 2,
        attachment: 0,
        assignees: [
          {
            avatar: "https://randomuser.me/api/portraits/men/50.jpg",
            name: "Peter Silie",
          },
        ],
      },
      {
        id: "b2ab9206-07c3-408c-8b1a-11d8c8bc67a4",
        priority: 0,
        title: "Add a feature to allow users to delete their account",
        chat: 0,
        attachment: 0,
        assignees: [
          {
            avatar: "https://randomuser.me/api/portraits/men/80.jpg",
            name: "Anna Bolika",
          },
        ],
      },
    ],
  },
];
