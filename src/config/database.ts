import { dataSource } from "./data.source";

export const initializeDatabase = async () => {
  try {
    const ds = await dataSource.initialize();
    console.log("Successfully connected: ", ds.isInitialized);
  } catch (error) {
    console.error(error);
  }
};
