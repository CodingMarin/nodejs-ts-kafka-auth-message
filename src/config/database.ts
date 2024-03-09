import { dataSource } from "./data.source";

export const initializeDatabase = async () => {
  try {
    const ds = await dataSource.initialize();
    console.log("✅ Database connection:", ds.isInitialized);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
};
