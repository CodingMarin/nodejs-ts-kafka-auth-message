import { Partitioners } from "kafkajs";
import { kafka } from "../utils";
import { JwtService } from "./shared/jwt.service";
import { dataSource } from "../config";
import { Message } from "../entities";

export default class KafkaService extends JwtService {
  private static readonly messageRepository = dataSource.getRepository(Message);

  static produceMessage = async (
    sender_id: any,
    recipient_id: any,
    message: string,
  ) => {
    try {
      const producer = await this.createProducer();

      await producer.send({
        messages: [{ key: `message-${Date.now()}`, value: message }],
        topic: "message",
      });

      const newMessage = new Message();
      newMessage.sender_id = sender_id;
      newMessage.recipient_id = recipient_id;
      newMessage.message = message;

      const data = await this.messageRepository.save(newMessage);

      return {
        message: "Message sending successfully",
        at: data.created_time,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error sending message, reason: ", error.message);
        throw error;
      }
    }
  };

  static getAllMessages = async () => {
    try {
      const messages = await this.messageRepository
        .createQueryBuilder("message")
        .select([
          "message.id",
          "message.message",
          "message.created_time",
          "sender.id AS sender_id",
          "recipient.id AS recipient_id",
        ])
        .leftJoin("message.sender_id", "sender")
        .leftJoin("message.recipient_id", "recipient")
        .orderBy("message.created_time", "DESC")
        .getRawMany();

      return {
        response: {
          messages,
        },
        success: true,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Get all users error, reason: ", error.message);
        throw error;
      }
    }
  };

  private static createProducer = async () => {
    const producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });
    await producer.connect();
    return producer;
  };
}
