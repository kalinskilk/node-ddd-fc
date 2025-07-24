import { Sequelize } from "sequelize";

describe("Product repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
