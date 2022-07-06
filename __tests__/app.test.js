const app = require("../app");
const db = require("../db/connection");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const {
  topicData,
  userData,
  commentData,
  articleData,
} = require("../db/data/test-data/index");

beforeAll(() => {
  return seed({
    topicData,
    userData,
    commentData,
    articleData,
  });
});

afterAll(() => db.end());

describe("App test", () => {
  describe("GET /api/topics", () => {
    test("200 :returns topic", () => {
      const obj = [
        { slug: "mitch", description: "The man, the Mitch, the legend" },
        { slug: "cats", description: "Not dogs" },
        { slug: "paper", description: "what books are made of" },
      ];
      return request(app)
        .get("/api/topics")
        .send(obj)
        .expect(200)
        .then((res) => {
          console.log(res.body);
          expect(res.body).toEqual({ topic: obj });
        });
    });
  });
});
test("200 :returns article by id", () => {
  const expectedArticle = {
    article_id: 1,
    title: "Living in the shadow of a great man",
    topic: "mitch",
    author: "butter_bridge",
    body: "I find this existence challenging",
    created_at: "2020-07-09T20:11:00.000Z",
    votes: 100,
    total_comments: 11,
  };

  return request(app)
    .get("/api/articles/1")
    .expect(200)

    .then(({ body: { article } }) => {
      expect(typeof article.article_id).toBe("number");
      expect(typeof article.title).toBe("string");
      expect(typeof article.author).toEqual("string");
      expect(typeof article.topic).toEqual("string");
      expect(typeof article.body).toEqual("string");
      expect(typeof article.votes).toEqual("number");
      expect(typeof article.created_at).toEqual("string");
      expect(typeof article.total_comments).toEqual("number");
      expect(article).toEqual(expectedArticle);
    });
});

describe("GET (comment count)", () => {
  test("/api/articles/:article_id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article.total_comments).toBe(11);
        expect(typeof article.total_comments).toBe("number");
      });
  });
});
