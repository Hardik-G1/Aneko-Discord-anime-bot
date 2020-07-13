var express = require("express");
var app = express();
require('dotenv').config()
const discord = require('discord.js');
var mongoose = require("mongoose");
const randomPuppy = require('random-puppy');
const axios = require("axios");
const cheerio = require("cheerio");
const translate = require('@vitalets/google-translate-api');
var summer_anime_2020 = require("./model/summer_anime_2020");
var premium = require("./model/premium");
var anime_all = require("./model/anime");
var movie_all = require("./model/movies");
var summer_anime_2020_movies = require("./model/summer_anime_2020_movies");
var bodyparser = require("body-parser");
const { ht } = require("@vitalets/google-translate-api/languages");
const akaneko = require('akaneko');
mongoose.connect(process.env.DB_LINK, {

    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

}).then(() => {

    console.log('Connected to DB');

}).catch(err => {
    console.log('ERROR :', err.message);

});
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const token = process.env.TO_DIS;
const client = new discord.Client();
app.get("/", function(req, res) {
    res.send("bot started")
})
app.get("/join", function(req, res) {
    res.redirect('https://discord.com/oauth2/authorize?client_id=723518879262965841&permissions=8&redirect_uri=https%3A%2F%2Fmorning-tor-46077.herokuapp.com%2F&response_type=code&scope=identify%20bot%20guilds')
})
client.on('message', async(msg) => {


    function regExpEscape(literal_string) {
        return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
    }

    function findin(dbname) {

        if (j.length > 2 && j !== "  " && j !== " ") {
            if (j.startsWith("#")) {
                ge = j;
                je = /.*/
            } else {
                je = sear(j);
                ge = /.*/
            }
            dbname.find({ name: je, anime_id: ge }).limit(7).exec(function(err, Data) {
                if (Data.length > 0) {
                    Data.forEach(function(part) {
                        genree = part.gener.toString();
                        if (part.rating === 0) {
                            des = part.studio + "\n" + part.episodes + ", " + part.date + "\n" + part.source;
                        } else {
                            des = part.rating + "\n" + part.studio + "\n" + part.episodes + ", " + part.date + "\n" + part.source;
                        }
                        const exampleEmbed = new discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(part.name[0])
                            .setImage(part.link)
                            .setDescription(des)
                            .addField(genree, part.synop, true)
                            .setFooter('@livechart.me' + part.anime_id);
                        msg.channel.send(exampleEmbed);

                    });
                } else {
                    msg.channel.send("Nothing Found. Try with alternative name");
                }
            });
        } else {
            msg.reply("Please enter the id or some name");
        }
    }

    function filter(dbname) {
        L = msg.content.split(" ");
        Li = L.slice(1, );
        var n1 = Li.indexOf("-g");
        var gen = [/.*/]
        if (n1 !== -1) {
            var ge = Li[n1 + Li.length / 2].split("/");
            gev = up(ge);
            gen = searl(gev);
            console.log(gen);
        }
        var n2 = Li.indexOf("-s");
        var sen = [/.*/]
        if (n2 !== -1) {
            var se = Li[n2 + Li.length / 2].split("/")
            sev = up(se);
            sen = searl(sev);
            console.log(sen);
        }
        var n3 = Li.indexOf("-st");
        var la = [/.*/]
        if (n3 !== -1) {
            var ste = Li[n3 + Li.length / 2].split("/");
            var sten = up(ste);
            la = [];
            for (i = 0; i < sten.length; i++) {
                la.push(sear(sten[i]))
            }
        }
        var n4 = Li.indexOf("-r");
        var re = 0
        if (n4 !== -1) {
            re = parseFloat(Li[n4 + Li.length / 2]);
        }
        dbname.find({ gener: { $in: gen }, source: { $in: sen }, studio: { $in: la }, rating: { $gte: re } }).exec(function(err, Data) {
            if (err) {
                console.log(err);
            } else {
                var n = Data.length;
                console.log(n);
                if (n > 0) {
                    var r = Math.floor(Math.random() * n);
                    genree = Data[r].gener.toString();
                    if (Data[r].rating === 0) {
                        des = Data[r].studio + "\n" + Data[r].episodes + ", " + Data[r].date + "\n" + Data[r].source;
                    } else {
                        des = Data[r].rating + "\n" + Data[r].studio + "\n" + Data[r].episodes + ", " + Data[r].date + "\n" + Data[r].source;
                    }
                    const exampleEmbed = new discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(Data[r].name[0])
                        .setImage(Data[r].link)
                        .setDescription(des)
                        .addField(genree, Data[r].synop, true)
                        .setFooter('@livechart.me' + Data[r].anime_id);
                    msg.channel.send(exampleEmbed);
                } else {
                    msg.channel.send("Nothing Found");
                }
            }
        });
    }

    function filtera(dbname) {
        L = msg.content.split(" ");
        Li = L.slice(1, );
        var n1 = Li.indexOf("-g");
        var gen = [/.*/]
        if (n1 !== -1) {
            var ge = Li[n1 + Li.length / 2].split("/");
            gev = up(ge);
            gen = searl(gev);
            console.log(gen);
        }
        var n2 = Li.indexOf("-s");
        var sen = [/.*/]
        if (n2 !== -1) {
            var se = Li[n2 + Li.length / 2].split("/")
            sev = up(se);
            sen = searl(sev);
            console.log(sen);
        }
        var n3 = Li.indexOf("-st");
        var la = [/.*/]
        if (n3 !== -1) {
            var ste = Li[n3 + Li.length / 2].split("/");
            var sten = up(ste);
            la = [];
            for (i = 0; i < sten.length; i++) {
                la.push(sear(sten[i]))
            }
        }
        var n4 = Li.indexOf("-r");
        var re = 0
        if (n4 !== -1) {
            re = parseFloat(Li[n4 + Li.length / 2]);
        }
        dbname.find({ gener: { $all: gen }, source: { $in: sen }, studio: { $in: la }, rating: { $gte: re } }).exec(function(err, Data) {
            if (err) {
                console.log(err);
            } else {
                var n = Data.length;
                console.log(n);
                if (n > 0) {
                    var r = Math.floor(Math.random() * n);
                    genree = Data[r].gener.toString();
                    if (Data[r].rating === 0) {
                        des = Data[r].studio + "\n" + Data[r].episodes + ", " + Data[r].date + "\n" + Data[r].source;
                    } else {
                        des = Data[r].rating + "\n" + Data[r].studio + "\n" + Data[r].episodes + ", " + Data[r].date + "\n" + Data[r].source;
                    }
                    const exampleEmbed = new discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(Data[r].name[0])
                        .setImage(Data[r].link)
                        .setDescription(des)
                        .addField(genree, Data[r].synop, true)
                        .setFooter('@livechart.me' + Data[r].anime_id);
                    msg.channel.send(exampleEmbed);
                } else {
                    msg.channel.send("Nothing Found");
                }
            }
        });
    }

    function up(a) {
        for (i = 0; i < a.length; i++) {
            a[i] = a[i][0].toUpperCase() + a[i].substring(1);

        }
        return a;
    }

    function ups(a) {
        a = a[0].toUpperCase() + a.substring(1);
        return a;
    }

    function sea(msg, key) {
        var result = ""
        var str = (msg.content).toLowerCase();

        var regex = new RegExp(regExpEscape(key), "gi");

        result = str.match(regex);
        if (result) {
            return result[0];
        } else {
            return false;
        }
    }

    function searl(l) {
        l1 = []
        for (i = 0; i < l.length; i++) {
            var regex = new RegExp(regExpEscape(l[i]), "gi");
            l1.push(regex);
        }
        return l1;
    }

    function ttoanime(m) {
        m = m * 1000;
        if (m !== 0) {
            x = [];
            var now = new Date().getTime();
            if (m > now) {
                var diff = m - now;
            } else {
                var multi = Math.floor((now - m) / 604800000);
                var diff = m - now + ((604800000) * (multi + 1));
            }
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            x.push(days);
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            x.push(hours);
            var min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            x.push(min);
            var seco = Math.floor((diff % (1000 * 60)) / (1000));
            x.push(seco);
            x.push(multi + 1);
            return x;
        } else {
            days = 0;
            hours = 0;
            min = 0;
            seco = 0;
            x = []
            x.push(days);
            x.push(hours);
            x.push(min);
            x.push(seco);
            return x;

        }
    }

    function ttoanimemov(m) {
        m = m * 1000;
        if (m !== 0) {
            x = [];
            var now = new Date().getTime();
            if (m > now) {
                var diff = m - now;
                var days = Math.floor(diff / (1000 * 60 * 60 * 24));
                x.push(days);
                var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                x.push(hours);
                var min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                x.push(min);
                var seco = Math.floor((diff % (1000 * 60)) / (1000));
                x.push(seco);
            } else {
                x = [0, 0, 0, 0]
            }
            return x;
        } else {
            days = 0;
            hours = 0;
            min = 0;
            seco = 0;
            x = []
            x.push(days);
            x.push(hours);
            x.push(min);
            x.push(seco);
            return x;
        }
    }

    function sear(key) {
        var regex = new RegExp(regExpEscape(key), "gi");
        return regex;
    }

    function tim(dbname) {
        if (a.startsWith("#")) {
            b = /.*/
        } else {
            a = /.*/
            b = sear(msg.content.slice(7, ));
        }
        dbname.find({ anime_id: a, name: b }).exec(function(err, Data) {
            if (Data.length > 0) {
                ttoanime(Data[0].time)
                total_seconds = Number(x[0]) * 86400 + Number(x[1]) * 3600 + Number(x[2]) * 60 + Number(x[3]);
                var c = total_seconds;
                var countdo = setInterval(timeram, 1000);
                msg.reply("Timer set for " + x[0] + "d" + x[1] + "h" + x[2] + "m" + x[3] + "s");

                function timeram() {
                    if (c == 0) {
                        const exampleEmbed = new discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(Data[0].name[0])
                            .setDescription("Episode Aired")
                            .setImage(Data[0].link)
                            .setFooter('@livechart.me' + Data[0].anime_id);
                        client.users.cache.get(msg.author.id).send(exampleEmbed);
                        clearInterval(countdo);
                    } else {
                        c = c - 1;
                        console.log(c);
                    }
                }
                timeram();
            } else {
                msg.reply("Nothing found.Please try again...");
            }
        });
    }
    //////////////////////////////////////////////////////////
    /////////////////Premium Activation//////////////////////
    ////////////////////////////////////////////////////////
    ///i left it to luck if someone by chance can get it/// 
    if (msg.content === process.env.PREMIUM_CODE) {
        if (msg.guild) {
            const Guild = client.guilds.cache.get(msg.guild.id); // Getting the guild.
            const Members_all = Guild.members.cache.map(member => member.id); // Getting the members and mapping them by ID.
            premium.create({ guild_id: msg.guild.id, name: Members_all });
            msg.channel.send("PREMIUM IS LIVE.......");
        } else {
            msg.reply("Premium cannot be activated through DM");
        }
    }
    /////////////////////////////////////////////////////////
    //////////////////HELP COMMANDS/////////////////////////
    /////////////////////////////////////////////////////// 
    else if (msg.content === '!h') {
        const exampleEmbed = new discord.MessageEmbed()
            .setTitle("Help Index")
            .setThumbnail('https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png')
            .setColor('#a0ff5c')
            .setDescription("Type " + "`!h ModuleName`" + " for all the commands in module")
            .addFields({ name: 'Find', value: '`findani`,' + '`findmov`', inline: true }, { name: 'Meme', value: '`pls meme`,' + '`pls dankmeme`,' + '` _fall`', inline: true }, { name: 'Translate *Premium', value: '`Translate`', inline: true }, { name: 'NSFW *Premium', value: '`pls wholesome`,' + '`_ass`,' + '`_doujin`,' + '`_hentai _maid`', inline: true }, { name: 'Timer', value: '`countdown`,' + '`remind`,' + '`weekly_time`', inline: true }, { name: 'Live', value: '`/today`', inline: true }, { name: 'Filters', value: '`.anime`,' + '`/.anime`,' + '`/movanime`,' + '`movanime`', inline: true }, { name: 'Recommendation', value: '`.recommend`,' + '`recommend`', inline: true }, { name: 'Delete *Premium', value: '`_clear full`,' + '`_clear`', inline: true })
            //  `/.anime .anime @nime /anime /.movanime .movanime /movanime movanime`
            .setFooter('@R0NN1E', 'https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png');
        msg.channel.send(exampleEmbed);
    } else if (msg.content === "!h Find" || msg.content === "!h find") {
        const exampleEmbed = new discord.MessageEmbed()
            .setTitle("Help Find")
            .setColor('#a0ff5c')
            .setThumbnail('https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png')
            .addFields({ name: 'Find Commands', value: '`findani`:Find anime with the id or name\n' + '`findmov`:Find anime movie with the id or name' }, { name: 'Example', value: '`findani #000001` ' + 'or' + ' `findani demon slayer`' })
            .setImage("https://res.cloudinary.com/iatneh/image/upload/v1594485285/Annotation_2020-07-11_215359_2_pczn8b.png")
            .setFooter('@R0NN1E', 'https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png');
        msg.channel.send(exampleEmbed);
    } else if (msg.content === "!h Meme" || msg.content === "!h meme") {
        randomPuppy("Animemes")
            .then(url => {
                const exampleEmbed = new discord.MessageEmbed()
                    .setTitle("Help Meme")
                    .setColor('#a0ff5c')
                    .setThumbnail('https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png')
                    .addFields({ name: 'Meme Commands', value: '`pls meme`:Gives random Anime meme from subreddit\n' + '`pls dankmeme`:Gives random Dank meme from subreddit\n' + '`cat_serious`,`_fall`,`cry panda`:Random Pics' }, { name: 'Example', value: '`pls meme`' })
                    .setImage(url)
                    .setFooter('@R0NN1E', 'https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png');
                msg.channel.send(exampleEmbed);
            })
    } else if (msg.content === "!h Translate" || msg.content === "!h translate") {
        const exampleEmbed = new discord.MessageEmbed()
            .setTitle("Help Translate")
            .setColor('#a0ff5c')
            .setThumbnail('https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png')
            .addFields({ name: 'Translate Command', value: '`translate some_text`:Translates from most languages to English(auto detects language)' }, { name: 'Example', value: '`translate こんにちは` will give back hello' })
            .setFooter('@R0NN1E', 'https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png');
        msg.channel.send(exampleEmbed);
    } else if (msg.content === "!h NSFW" || msg.content === "!h nsfw" || msg.content === "!h Nsfw") {
        const exampleEmbed = new discord.MessageEmbed()
            .setTitle("Help NSFW")
            .setColor('#a0ff5c')
            .setThumbnail('https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png')
            .addFields({ name: 'NSFW Commands', value: '`pls wholesome`:Gives back a Wholesome Hentai\n' + '`lewdbomb`:Spams 5 Nsfw pics\n' + '`lewdneko`:Random pic of lewd neko\n' + '`_ass`,' + '`_cum`,' + '`_panties`,' + '`_femdom`,' + '`_doujin`,' + '`_hentai`,' + '`_maid`,' + '`_orgy`,' + '`_mwallpaper`,' + '`_wallpaper`:Gives back a Nsfw pic of the category' }, { name: 'Example', value: '`_ass` will return some (・ωｰ)～☆' })
            .setFooter('@R0NN1E', 'https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png');
        msg.channel.send(exampleEmbed);
    } else if (msg.content === "!h Timer" || msg.content === "!h timer") {
        const exampleEmbed = new discord.MessageEmbed()
            .setTitle("Help Timer")
            .setColor('#a0ff5c')
            .setThumbnail('https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png')
            .addFields({ name: 'Timer Commands', value: '`countdown 00h00m30s some_text`:Set a timer for 30s(or just 30s/1h5m1s will not work it should have a zero infront)\n' + '`remind id or name`:will set the timer for the next episode and notify when aired\n' + '`remindmov id or name`:will remind the release of movie\n' + '`weekly_time id or name`:will notify every episode of an anime' }, { name: 'Example', value: '`remind #000001` will notify when the episode is released' })
            .setFooter('@R0NN1E', 'https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png');
        msg.channel.send(exampleEmbed);
    } else if (msg.content === "!h Live" || msg.content === "!h live") {
        const exampleEmbed = new discord.MessageEmbed()
            .setTitle("Help Live")
            .setColor('#a0ff5c')
            .setThumbnail('https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png')
            .addFields({ name: 'Live Commands', value: '`/today`:Will return all the anime in the 24hr limit' }, { name: 'Example', value: '`/today` will give the anime airing or aired within 24 hr' })
            .setFooter('@R0NN1E', 'https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png');
        msg.channel.send(exampleEmbed);
    } else if (msg.content === "!h Live" || msg.content === "!h live") {
        const exampleEmbed = new discord.MessageEmbed()
            .setTitle("Help Live")
            .setColor('#a0ff5c')
            .setThumbnail('https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png')
            .addFields({ name: 'Live Commands', value: '`/today`:Will return all the anime in the 24hr limit' }, { name: 'Example', value: '`/today` will give the anime airing or aired within 24 hr' })
            .setFooter('@R0NN1E', 'https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png');
        msg.channel.send(exampleEmbed);
    } else if (msg.content === "!h Filters" || msg.content === "!h filters" || msg.content === "!h filter" || msg.content === "!h Filter") {
        const exampleEmbed = new discord.MessageEmbed()
            .setTitle("Help Filters")
            .setColor('#a0ff5c')
            .setThumbnail('https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png')
            .addFields({ name: 'Filters Commands', value: '**-g** for genre, **-s** for source,**-st** for studio,**-r** for rating\n' + 'for -g separate by / Ex: comedy/action \n Use slice for slice of life and Ai for shounen Ai\n' + 'for -s source use light for light novel  Ex:@nime -s manga or @nime -s original\n' + 'for -st first word of the studio Ex: @nime bones\n' + 'for -r give number between 0-10\n' + 'if you only want to filter through studio only and this season then `/anime -st bones`\n all of the four parameter should in be order like `/movanime -g -s -st -r genre1/genre2/../genreN manga bones 5`\n' + 'if No filter is not provided then it will provide a random result\n' + '`@nime or movanime`:from **all anime or movie** old+this season, with **any** of the genre provided\n `.anime or .movanime`:filter including **all** genre provided\n`/anime or /movanime`:from **this season only**, with **any** of the genre provided\n`/.anime or /.movanime`:from **this season** only, with **all** the genre provided' }, { name: 'Example', value: '`/anime -s -r manga 6` Gives back an anime from this season only, with source Manga and rating greater than 6' }, { name: 'Example2', value: '`.anime -st -g bones action/shounen` Gives back an anime with studio bones and genre action and shounen' })
            .setFooter('@R0NN1E', 'https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png');
        msg.channel.send(exampleEmbed);
    } else if (msg.content === "!h Recommendation" || msg.content === "!h recommendation") {
        const exampleEmbed = new discord.MessageEmbed()
            .setTitle("Help Recommend")
            .setColor('#a0ff5c')
            .setThumbnail('https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png')
            .addFields({ name: 'Recommend Commands(only for anime)', value: '`.recommend @someone animeid`:sends recommended anime to dm of the @someone\n' + '`recommend @someone animeid`:sends recommended anime in channel' }, { name: 'Example', value: '`recommend @someone #000001`: sends a message in the channel with the anime recommended tagging the user' })
            .setFooter('@R0NN1E', 'https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png');
        msg.channel.send(exampleEmbed);
    } else if (msg.content === "!h Delete" || msg.content === "!h delete") {
        const exampleEmbed = new discord.MessageEmbed()
            .setTitle("Help Delete")
            .setColor('#a0ff5c')
            .setThumbnail('https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png')
            .addFields({ name: 'Delete Commands', value: '`_clear`:deletes 10 messages in the channel\n' + '`_clear full`:deletes 100 messages in the channel\n The bot needs Administrator Permission' }, { name: 'Example', value: '`_clear` delete 10 most recent messages' })
            .setFooter('@R0NN1E', 'https://www.kindpng.com/picc/m/78-781530_rikkisgirl-kawaii-anime-animegirl-pastel-cute-kink-anime.png');
        msg.channel.send(exampleEmbed);
    }
    ///////////////////////////////////////////////////////////
    //////////////////MEME FUNCTION////////////////////////////
    //////////////////////////////////////////////////////////
    else if (sea(msg, 'cat_serious') === 'cat_serious' && (!(msg.author.bot))) {
        const exampleEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setImage('https://res.cloudinary.com/dtarijclg/image/upload/v1593098861/80bec63f-9659-4876-8d38-b91f723f9d4b_uc4gz5.webp')
        msg.channel.send(exampleEmbed);
    } else if (sea(msg, 'pls meme') === 'pls meme' && (!(msg.author.bot))) {
        console.log(msg.author.bot);
        randomPuppy("Animemes")
            .then(url => {
                const exampleEmbed = new discord.MessageEmbed()
                    .setTitle("Here you go.")
                    .setColor('#0099ff')
                    .setImage(url)
                msg.channel.send(exampleEmbed);
            })
    } else if (sea(msg, 'pls dankmeme') === 'pls dankmeme' && (!(msg.author.bot))) {
        console.log(msg.author.bot);
        randomPuppy("dankmemes")
            .then(url => {
                if (url.endsWith("mp4")) {
                    msg.channel.send(url);
                } else if (url.endsWith("gif")) {
                    msg.channel.send(url)
                } else {
                    const exampleEmbed = new discord.MessageEmbed()
                        .setTitle("Here you go.")
                        .setColor('#0099ff')
                        .setImage(url)
                    msg.channel.send(exampleEmbed);
                }
            })
    } else if (sea(msg, 'crypanda') === 'crypanda' && (!(msg.author.bot))) {
        const exampleEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setImage('https://res.cloudinary.com/dtarijclg/image/upload/v1593098861/0b848f1c-9518-4c8c-aa4b-dcb603598655_pekwmt.webp')
        msg.channel.send(exampleEmbed);
    } else if (sea(msg, '_fall') === '_fall' && (!(msg.author.bot))) {
        const exampleEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setImage(' https://res.cloudinary.com/dtarijclg/image/upload/v1593099340/fall_iao3hw.webp')
        msg.channel.send(exampleEmbed);
    }
    /////////////////////////////////////////////////////////////////////
    ///////////////////////FINDING ANIME/////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    else if (sea(msg, 'findmov') === 'findmov' && (!(msg.author.bot))) {
        j = (msg.content).slice(8, );
        findin(movie_all);
    } else if (sea(msg, 'findani') === 'findani' && (!(msg.author.bot))) {
        j = (msg.content).slice(8, );
        findin(anime_all);
    }
    ////////////////////////////////////////////////////////////////////
    ///////////////////////////TRANSLATE////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    else if (sea(msg, 'translate') === 'translate' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                a = msg.content.slice(10, );
                translate(a, { to: 'en' }).then(res => {
                    msg.reply(res.text);
                }).catch(err => {
                    console.error(err);
                });
            } else {
                msg.reply("Please get the premium version");
            }
        })
    }
    /////////////////////////////////////////////////////////////////////
    ///////////////////////NSFW COMMANDS////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////https://github.com/R3l3ntl3ss/Meme_Api/////////////////
    ////////////////////////@R3l3ntl3ss//////////////////////////////
    else if (sea(msg, 'pls wholesome') === 'pls wholesome' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                const mainUrl = 'https://meme-api.herokuapp.com/gimme/wholesomehentai';
                axios
                    .get(mainUrl)
                    .then((response) => {
                        dealWithData(response.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                const dealWithData = (html) => {
                    const exampleEmbed = new discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(html.title)
                        .setURL(html.postLink)
                        .setDescription("Here you go!")
                        .setImage(html.url);
                    msg.channel.send(exampleEmbed);
                }
            } else {
                msg.reply("Please get the premium version");
            }
        })
    }
    ///////////////////////////////////////////////////////////////////
    //////////////////////@akaneko npm/////////////////////////////////
    /////////////////////AKANEKO NSFW/////////////////////////////////
    ///////////////////////////////////////////////////////////////// 
    else if (sea(msg, 'lewdbomb') === 'lewdbomb' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                b = akaneko.lewdBomb(5)
                b.forEach(element => {
                    const exampleEmbed = new discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setImage(element);
                    msg.channel.send(exampleEmbed);
                })
            } else {
                msg.reply("Please get the premium version");
            }
        })
    } else if (sea(msg, 'lewdneko') === 'lewdneko' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                const exampleEmbed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setImage(akaneko.lewdNeko());
                msg.channel.send(exampleEmbed);
            } else {
                msg.reply("Please get the premium version");
            }
        })
    } else if (sea(msg, '_ass') === '_ass' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                const exampleEmbed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setImage(akaneko.nsfw.ass());
                msg.channel.send(exampleEmbed);
            } else {
                msg.reply("Please get the premium version");
            }
        })
    } else if (sea(msg, '_cum') === '_cum' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                const exampleEmbed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setImage(akaneko.nsfw.cum());
                msg.channel.send(exampleEmbed);
            } else {
                msg.reply("Please get the premium version");
            }
        })
    } else if (sea(msg, '_femdom') === '_femdom' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                const exampleEmbed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setImage(akaneko.nsfw.femdom());
                msg.channel.send(exampleEmbed);
            } else {
                msg.reply("Please get the premium version");
            }
        })
    } else if (sea(msg, '_doujin') === '_doujin' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                const exampleEmbed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setImage(akaneko.nsfw.doujin());
                msg.channel.send(exampleEmbed);
            } else {
                msg.reply("Please get the premium version");
            }
        })
    } else if (sea(msg, '_hentai') === '_hentai' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                const exampleEmbed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setImage(akaneko.nsfw.hentai());
                msg.channel.send(exampleEmbed);
            } else {
                msg.reply("Please get the premium version");
            }
        })
    } else if (sea(msg, '_maid') === '_maid' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                const exampleEmbed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setImage(akaneko.nsfw.maid());
                msg.channel.send(exampleEmbed);
            } else {
                msg.reply("Please get the premium version");
            }
        })
    } else if (sea(msg, '_orgy') === '_orgy' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                const exampleEmbed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setImage(akaneko.nsfw.orgy());
                msg.channel.send(exampleEmbed);
            } else {
                msg.reply("Please get the premium version");
            }
        })
    } else if (sea(msg, '_panties') === '_panties' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                const exampleEmbed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setImage(akaneko.nsfw.panties());
                msg.channel.send(exampleEmbed);
            } else {
                msg.reply("Please get the premium version");
            }
        })
    } else if (sea(msg, '_mwallpaper') === '_mwallpaper' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                const exampleEmbed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setImage(akaneko.nsfw.mobileWallpapers());
                msg.channel.send(exampleEmbed);
            } else {
                msg.reply("Please get the premium version");
            }
        })

    } else if (sea(msg, '_wallpaper') === '_wallpaper' && (!(msg.author.bot))) {
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                const exampleEmbed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setImage(akaneko.nsfw.wallpapers());
                msg.channel.send(exampleEmbed);
            } else {
                msg.reply("Please get the premium version");
            }
        })
    }
    //////////////////////////////////////////////////////////////////////
    ///////////////////////TIMER FUNCTION/////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    else if (sea(msg, 'countdown') === 'countdown' && (!(msg.author.bot))) {
        a = msg.content.slice(10, );
        b = a.split(" ");
        cq = b[0].indexOf("s");
        if (cq !== -1) {
            sec = Number(b[0].slice(cq - 2, cq));
        } else { sec = 0; }
        mq = b[0].indexOf("m");
        if (mq !== -1) {
            min = Number(b[0].slice(mq - 2, mq));
        } else {
            min = 0;
        }
        hq = b[0].indexOf("h")
        if (hq !== -1) {
            hr = Number(b[0].slice(hq - 2, hq));
        } else {
            hr = 0;
        }
        if (Number.isInteger(hr) && Number.isInteger(min) && Number.isInteger(sec)) {
            var c = hr * 60 * 60 + min * 60 + sec;
            var countdo = setInterval(timera, 1000);

            function timera() {
                if (c == 0) {
                    msg.reply("Timer Done!, " + b.slice(1, ));
                    clearInterval(countdo);
                } else {
                    c = c - 1;
                    console.log(c);
                }
            }
            timera();
        } else {
            msg.reply("Provide correct time!");
        }
    } else if (sea(msg, 'remindmov') === 'remindmov' && (!(msg.author.bot))) {
        a = msg.content.slice(10, );
        if (a.startsWith("#")) {
            b = /.*/
        } else {
            a = /.*/
            b = sear(msg.content.slice(10, ));
        }
        summer_anime_2020_movies.find({ anime_id: a, name: b }).exec(function(err, Data) {
            if (Data.length > 0) {
                ttoanimemov(Data[0].time)
                total_seconds = Number(x[0]) * 86400 + Number(x[1]) * 3600 + Number(x[2]) * 60 + Number(x[3]);
                var c = total_seconds;
                var countdo = setInterval(timeram, 1000);
                msg.reply("Timer set for " + x[0] + "d" + x[1] + "h" + x[2] + "m" + x[3] + "s");

                function timeram() {
                    if (c == 0) {
                        const exampleEmbed = new discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(Data[0].name[0])
                            .setDescription("Episode Aired")
                            .setImage(Data[0].link)
                            .setFooter('@livechart.me' + Data[0].anime_id);
                        client.users.cache.get(msg.author.id).send(exampleEmbed);
                        clearInterval(countdo);
                    } else {
                        c = c - 1;
                        console.log(c);
                    }
                }
                timeram();
            } else {
                msg.reply("Nothing found.Please try again...");
            }
        });
    } else if (sea(msg, 'remind') === 'remind' && (!(msg.author.bot))) {
        a = msg.content.slice(7, );
        tim(summer_anime_2020);
    }
    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////WEEKLY TIMER/////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////// 
    else if (sea(msg, 'weekly_time') === 'weekly_time' && (!(msg.author.bot))) {
        a = msg.content.slice(12, );
        if (a.startsWith("#")) {
            b = /.*/
        } else {
            a = /.*/
            b = sear(msg.content.slice(12, ));
        }
        summer_anime_2020.find({ anime_id: a, name: b }).exec(function(err, Data) {
            if (Data.length > 0) {
                epi = Number(Data[0].episodes.split(" ")[0])
                ttoanime(Data[0].time)
                total_seconds = Number(x[0]) * 86400 + Number(x[1]) * 3600 + Number(x[2]) * 60 + Number(x[3]);
                var c = total_seconds;
                var countdo = setInterval(timerami, 1000);
                msg.reply("Timer set for " + x[0] + "d" + x[1] + "h" + x[2] + "m" + x[3] + "s");
                epis = x[4]

                function timerami() {
                    if (c == 0) {
                        const exampleEmbed = new discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(Data[0].name[0])
                            .setDescription("Episode Aired")
                            .setImage(Data[0].link)
                            .setFooter('@livechart.me' + Data[0].anime_id);
                        client.users.cache.get(msg.author.id).send(exampleEmbed);
                        if (Number.isInteger(epi)) {
                            if (epis <= epi) {
                                c = 604800;
                                epis = epis + 1
                            } else {
                                clearInterval(countdo);
                            }
                        } else {
                            c = 604800;
                        }
                    } else {
                        c = c - 1;
                    }
                }
                timerami();
            } else {
                msg.reply("Only anime from ccurrent season. Try again");
            }
        });

    }
    //////////////////////////////////////////////////////////////////
    ///////////////////////LIVE ANIME/////////////////////////////////
    ///////////////////////////////////////////////////////////////// 
    else if (sea(msg, '/today') === '/today' && (!(msg.author.bot))) {
        summer_anime_2020.find({}).exec(function(err, Data) {
            count = 0
            Data.forEach(function(part) {
                ttoanime(part.time);
                if (x[0] == 0 && x[1] == 0 && x[2] == 0 && x[3] == 0) {
                    count += 1;
                } else {
                    if (x[0] == 0 || (x[0] == 6 && x[1] > 12)) {
                        genree = part.gener.toString();
                        if (part.rating === 0) {
                            des = part.studio + "\n" + part.episodes + "\n" + "Time Left for next episode " + x[0] + "d " + x[1] + "h " + x[2] + "m " + x[3] + "s" + "\n" + part.source;
                        } else {
                            des = part.rating + "\n" + part.studio + "\n" + part.episodes + "\n" + "Time Left for next episode " + x[0] + "d " + x[1] + "h " + x[2] + "m " + x[3] + "\n" + part.source;
                        }
                        const exampleEmbed = new discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(part.name[0])
                            .setImage(part.link)
                            .setDescription(des)
                            .addField(genree, part.synop, true)
                            .setFooter('@livechart.me' + part.anime_id);
                        msg.channel.send(exampleEmbed);
                    }
                }
            });
            msg.channel.send(count + "anime already finished airing");
        })
    }
    ////////////////////////////////////////////////////////////////////
    //////////////////////ANIME FILTER PART////////////////////////////
    //////////////////////////////////////////////////////////////////
    else if (sea(msg, '/.movanime') === '/.movanime' && (!(msg.author.bot))) {
        filtera(summer_anime_2020_movies);
    } else if (sea(msg, '/movanime') === '/movanime' && (!(msg.author.bot))) {
        filter(summer_anime_2020_movies);
    } else if (sea(msg, '.movanime') === '.movanime' && (!(msg.author.bot))) {
        filtera(movie_all);
    } else if (sea(msg, 'movanime') === 'movanime' && (!(msg.author.bot))) {
        filter(movie_all);
    } else if (sea(msg, '/.anime') === '.anime' && (!(msg.author.bot))) {
        filtera(summer_anime_2020);
    } else if (sea(msg, '.anime') === '.anime' && (!(msg.author.bot))) {
        filtera(anime_all);
    } else if (sea(msg, '/anime') === '/anime' && (!(msg.author.bot))) {
        filter(summer_anime_2020)
    } else if (sea(msg, '@nime') === '@nime' && (!(msg.author.bot))) {
        filter(anime_all)
    }

    ////////////////////////////////////////////////////////////////////
    ///////////////////////RECOMMENDING PART////////////////////////////
    ////////////////////////////////////////////////////////////////////
    else if (msg.content.startsWith("recommend") && (!(msg.author.bot))) {
        alpha = msg.content.split(" ");
        anime_all.find({ anime_id: alpha[2] }).exec(function(err, Data) {
            if (Data.length > 0) {
                genree = Data[0].gener.toString();
                if (Data[0].rating === 0) {
                    des = Data[0].studio + "\n" + Data[0].episodes + ", " + Data[0].date + "\n" + Data[0].source;
                } else {
                    des = Data[0].rating + "\n" + Data[0].studio + "\n" + Data[0].episodes + ", " + Data[0].date + "\n" + Data[0].source;
                }
                msg.channel.send(msg.author.toString() + " recommended this to " + alpha[1].toString());
                const exampleEmbed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(Data[0].name[0])
                    .setImage(Data[0].link)
                    .setDescription(des)
                    .addField(genree, Data[0].synop, true)
                    .setFooter('@livechart.me' + Data[0].anime_id);
                msg.channel.send(exampleEmbed);
            } else {
                movie_all.find({ anime_id: alpha[2] }).exec(function(err, ele) {
                    if (ele.length > 0) {
                        genree = ele[0].gener.toString();
                        if (ele[0].rating === 0) {
                            des = ele[0].studio + "\n" + ele[0].episodes + ", " + ele[0].date + "\n" + ele[0].source;
                        } else {
                            des = ele[0].rating + "\n" + ele[0].studio + "\n" + ele[0].episodes + ", " + ele[0].date + "\n" + ele[0].source;
                        }
                        msg.channel.send(msg.author.toString() + " recommended this to " + alpha[1].toString());
                        const exampleEmbed = new discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(ele[0].name[0])
                            .setImage(ele[0].link)
                            .setDescription(des)
                            .addField(genree, ele[0].synop, true)
                            .setFooter('@livechart.me' + ele[0].anime_id);
                        msg.channel.send(exampleEmbed);
                    } else {
                        msg.reply("No Anime or movie found wwith this id.")
                    }
                })
            }
        })
    } else if (msg.content.startsWith(".recommend") && (!(msg.author.bot))) {
        alpha = msg.content.split(" ");
        anime_all.find({ anime_id: alpha[2] }).exec(function(err, Data) {
            if (Data.length > 0) {
                genree = Data[0].gener.toString();
                if (Data[0].rating === 0) {
                    des = Data[0].studio + "\n" + Data[0].episodes + ", " + Data[0].date + "\n" + Data[0].source;
                } else {
                    des = Data[0].rating + "\n" + Data[0].studio + "\n" + Data[0].episodes + ", " + Data[0].date + "\n" + Data[0].source;
                }
                al = alpha[1].slice(3, 21);
                console.log(al);
                console.log(client.users.cache);
                client.users.cache.get(al).send(msg.author.toString() + " recommended this to " + alpha[1].toString());
                const exampleEmbed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(Data[0].name[0])
                    .setImage(Data[0].link)
                    .setDescription(des)
                    .addField(genree, Data[0].synop, true)
                    .setFooter('@livechart.me' + Data[0].anime_id);
                client.users.cache.get(al).send(exampleEmbed);
            } else {
                movie_all.find({ anime_id: alpha[2] }).exec(function(err, Data) {
                    if (Data.length > 0) {
                        genree = Data[0].gener.toString();
                        if (Data[0].rating === 0) {
                            des = Data[0].studio + "\n" + Data[0].episodes + ", " + Data[0].date + "\n" + Data[0].source;
                        } else {
                            des = Data[0].rating + "\n" + Data[0].studio + "\n" + Data[0].episodes + ", " + Data[0].date + "\n" + Data[0].source;
                        }
                        al = alpha[1].slice(3, 21);
                        console.log(al);
                        console.log(client.users.cache);
                        client.users.cache.get(al).send(msg.author.toString() + " recommended this to " + alpha[1].toString());
                        const exampleEmbed = new discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(Data[0].name[0])
                            .setImage(Data[0].link)
                            .setDescription(des)
                            .addField(genree, Data[0].synop, true)
                            .setFooter('@livechart.me' + Data[0].anime_id);
                        client.users.cache.get(al).send(exampleEmbed);
                    } else {
                        msg.reply("No Anime or movie found wwith this id.");
                    }
                })
            }
        })
    }
    /////////////////////////////////////////////////////////////////
    ///////////////////DELETING MESSAGES////////////////////////////
    ///////////////////////////////////////////////////////////////
    ///*****************REQUIRE ADMIN PERMISSION****************///
    else if (sea(msg, '_clear') === '_clear') {
        const fetched = await msg.channel.messages.fetch({ limit: 10 });
        await premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                msg.channel.bulkDelete(fetched);
            } else {
                msg.reply("Please get the premium version");
            }
        });

    } else if (sea(msg, '_clear full') === '_clear full') {
        const fetched = await msg.channel.messages.fetch({ limit: 100 });
        premium.find({ name: msg.author.id }).exec(function(err, Data) {
            if (Data.length > 0) {
                msg.channel.bulkDelete(fetched)
            } else {
                msg.reply("Please get the premium version");
            }
        });

    }
});
client.on('ready', () => {
    client.user.setActivity("!h for help", '!h for help');
    console.log("bot connected");
});
client.login(token);
app.listen(process.env.PORT || 3000, function() {
    console.log("server started");
});