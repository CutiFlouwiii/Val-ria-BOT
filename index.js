const express = require('express');
const app = express();
app.get('/', (request, response) => {
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log(
		`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
	);
	response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require('discord.js'); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require('./config.json'); //Pegando o prefixo do bot para respostas de comandos


/*

client.on("guildMemberAdd", async (member) => {

  let guild = client.guilds.cache.ger(" ");
  let channel = client.channels.cache.get(" ");




})

*/


client.on('message', message => {
	if (message.author.bot) return;
	if (message.channel.type == 'dm') return;
	if (!message.content.toLowerCase().startsWith(config.prefix)) return;
	if (
		message.content.startsWith(`<@!${client.user.id}>`) ||
		message.content.startsWith(`<@${client.user.id}>`)
	)
		return;

	const args = message.content
		.trim()
		.slice(config.prefix.length)
		.split(/ +/g);
	const command = args.shift().toLowerCase();

	try {
		const commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args);
	} catch (err) {
		console.error('Erro:' + err);
	}
});

client.on('ready', () => {
	let activities = [
			'💝 Bot ainda em desenvolvimento! 💝',
			'📡 comandos principais: "..help" e "..comandos"',
			'🚫 DIGA NÃO A BOTFOBIA! BOTS TAMBÉM SÃO GENTE! 🚫',
			'✨ Eu fui feita pela maravilhosa 🍓 Flor de Morango 🍓#9178',
			'📡 comandos principais: "..help" e "..comandos"',
			'🎉 Em breve mais comandos serão adicionados! Fique atento! :)',
			'👀',
      `Atualmente estou em ${client.guilds.cache.size} servidores! 😋`,
			'Minha versão atual é 1.17.2 🍕',
			'📡 comandos principais: "..help" e "..comandos"',
			'🎨 Desenho feito pela maravilhosa LunisNox#1978',
			'🏠 Em breve meu WedSite estara terminado! https://valeria-website.cutiflouwiii.repl.co',
			'Sabia que eu sou um Bot de codigo aberto? Visite: https://repl.it/@CutiFlouwiii/Valeria 😊',
			'📡 comandos principais: "..help" e "..comandos"',
			'"Diga não as drogas, e diga sim ao mate" -Yong Lixo Gemaplys 🎵',
			'👁️👄👁️',
			'Programada em JavaScript 😋 (nodeJS)'
			],
		i = 0;
	setInterval(
		() =>
			client.user.setActivity(`${activities[i++ % activities.length]}`, {
				type: 'PLAYING'
			}),
		25000
	);
	console.log('Estou Online!');
});

client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token
