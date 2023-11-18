"use strict";

/**
 *  Servicios de escucha de eventos rabbit
 */
import amqp = require("amqplib");
import * as env from "../../server/environment";
import { RabbitProcessor, IRabbitMessage } from "./common";

export class RabbitTopicConsumer {
    conf = env.getConfig(process.env);
    processors = new Map<string, RabbitProcessor>();

    constructor(private exchange: string, private topic: string) {
    }

    addProcessor(type: string, processor: RabbitProcessor) {
        console.log("Adding Topic Processor. Type: ", type, + " processor: " + processor.name)
        this.processors.set(type, processor);
    }

    /**
     * Escucha eventos específicos de cart.
     *
     * article-exist : Es un evento que lo envía Catalog indicando que un articulo existe y es valido para el cart.
     */
    async init() {
        try {
            const connection = await amqp.connect(this.conf.rabbitUrl);
            const channel = await connection.createChannel();

            channel.on("close", function () {
                console.error("RabbitMQ  " + this.exchange + " conexión cerrada, intentado reconecta en 10'");
                setTimeout(() => this.init(), 10000);
            });

            console.log("RabbitMQ " + this.exchange + " conectado");

            await channel.assertExchange(this.exchange, "topic", { durable: false });

            const { queue } = await channel.assertQueue('', { exclusive: true });

            await channel.bindQueue(queue, this.exchange, this.topic);

            await channel.consume(queue,
                (message) => {
                    const rabbitMessage: IRabbitMessage = JSON.parse(message.content.toString());
                    if (this.processors.has(rabbitMessage.type)) {
                        this.processors.get(rabbitMessage.type)(rabbitMessage);
                    }
                }, { noAck: true });
        } catch (err) {
            console.error("RabbitMQ " + this.exchange + " " + err.message);
            setTimeout(() => this.init(), 10000);
        }
    }
}

