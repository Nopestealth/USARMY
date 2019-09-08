const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('Je suis bien connecté.')
});

bot.on('guildMemberAdd', member => {
    // Ajoute le Rôle "Citoyen" à un nouveau joueur.
    var role = member.guild.roles.find('name', "Citoyen");
    member.addRole(role);
});

bot.on('message', message => {
    // Définit les constantes.
    let prefix = "$"
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    // Liste des Commandes

    if (cmd === `${prefix}clear`) {
        if (message.member.roles.get('620250341807489044')) {
            message.delete(1500);
            const amount = parseInt(args[0]);
            if (!amount) return message.author.send(`Vous n'avez pas précisé le nombre de messages à supprimer. **Utilisation :** ?clear **[Montant]**`);
            
            // Supprime le nombre de messages spécifiés.
            message.channel.bulkDelete(amount)
        }
        else
        {
            message.delete(1500);
            message.author.send(`Tu n'as pas la permission pour utiliser cette commande.`);
        }
    }

    if (cmd === `${prefix}kick`) {
        if (message.member.roles.get('620250341807489044')) {
            message.delete(1500);
            let sUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!sUser) return message.author.send(`Vous n'avez pas mentionné de joueurs.`);
            let sRaison = args.join(" ").slice(22);
            if (!sRaison) return message.author.send(`Vous n'avez pas entrer une raison pour expulser ce joueur.`)

            let kickEmbed = new Discord.RichEmbed()
            .setTitle("~Kick~")
            .setColor("#e56b00")
            .setAuthor('RiseMyID', 'https://i.imgur.com/vC0rDiy.png')
            .setThumbnail('https://i.imgur.com/vC0rDiy.png')
            .addField("Utilisateur Exlue", `${sUser}`)
            .addField("Exlue par", `${message.author.username}`)
            .addField("Raison", sRaison)
            .setFooter('RideMyID | $aide', 'https://i.imgur.com/vC0rDiy.png')
            
            let logsChannel = message.guild.channels.find(`name`, "logs");
        
            if (message.member.roles.get('620250341807489044')) {
                message.guild.member(sUser).kick(sRaison);  
                logsChannel.send(kickEmbed);
            }
        }
        else
        {
            message.delete(1500);
            message.author.send(`Tu n'as pas la permission pour utiliser cette commande.`);
        }
    }

    if (cmd === `${prefix}ban`) {
        if (message.member.roles.get('620250341807489044')) {
            message.delete(1500);
            let sUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!sUser) return message.author.send(`Vous n'avez pas mentionné de joueurs.`);
            let sRaison = args.join(" ").slice(22);
            if (!sRaison) return message.author.send(`Vous n'avez pas entrer une raison pour bannir ce joueur.`)

            let banEmbed = new Discord.RichEmbed()
            .setTitle("~Ban~")
            .setColor("#720ab8")
            .setAuthor('RiseMyID', 'https://i.imgur.com/vC0rDiy.png')
            .setThumbnail('https://i.imgur.com/vC0rDiy.png')
            .addField("Utilisateur Banni", `${sUser}`)
            .addField("Banni par", `${message.author.username}`)
            .addField("Raison", sRaison)
            .setFooter('RideMyID | $aide', 'https://i.imgur.com/vC0rDiy.png')
            let logsChannel = message.guild.channels.find(`name`, "logs");
        
            if (message.member.roles.get('620250341807489044')) {
                message.guild.member(sUser).ban(sRaison);  
                logsChannel.send(banEmbed);
            }
        }
        else
        {
            message.delete(1500);
            message.author.send(`Tu n'as pas la permission pour utiliser cette commande.`);
        }
    }

    if (cmd === `${prefix}proposition`) {
        if (message.channel.id === `619612688049242112`) {
            message.delete(0);
            let sProposition = args.join(" ").slice(0);
            if (!sProposition) return message.author.send(`Vous n'avez précisé aucune proposition, merci d'en entrer une.`)

            let propositionEmbed = new Discord.RichEmbed()
            .setTitle(`Proposition - ${message.author.username}`)
            .setThumbnail("https://i.imgur.com/vC0rDiy.png")
            .setColor("#720ab8")
            .addField('Idée de', `${message.author.username}`)
            .addField('Proposition', `${sProposition}`)

            message.channel.send(propositionEmbed)
            .then(function (message) {
                message.react(`✅`)
                message.react(`❌`)
            });
        }
        else
        {
            message.delete(0);
            message.author.send(`Tu n'es pas dans le bon channel.`)
        }
    }

    if (cmd === `${prefix}atweet`) {
        message.delete(0);
        if (message.channel.id === `619612695880269856`) {
            let aMessage = args.join(" ").slice(0);
            if (!aMessage) return message.author.send(`Vous n'avez pas entrer de message à écrire en anonyme.`)

            let darknetChannel = message.guild.channels.find(`name`, "📱-darknet");

            darknetChannel.send(aMessage)
        }
    }
})
bot.login(process.env.TOKEN);
