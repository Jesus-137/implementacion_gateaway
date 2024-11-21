import amqplib from 'amqplib';

export async function consumeMessages(cola:string, callback: (msg: string) => void): Promise<void> {
  try {
    const connection = await amqplib.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue(cola, { durable: true });

    console.log(`Esperando mensajes en la cola: ${cola}`);

    await channel.consume(cola, (msg) => {
      if (msg) {
        const messageContent = msg.content.toString();
        console.log(`Mensaje recibido: ${messageContent}`);
        callback(messageContent); // Envía el mensaje al callback
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error en el consumidor:', error);
  }
}
