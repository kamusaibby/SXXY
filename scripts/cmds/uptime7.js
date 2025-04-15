
      const imagePath = `${__dirname}/uptime_image.png`;
      const buffer = canvas.toBuffer();
      fs.writeFileSync(imagePath, buffer);

      await message.reply({
        body: `──────────────────      
𝗔𝗱𝗺𝗶𝗻 𝗜𝗻𝗳𝗼 :

𝗢𝗪𝗡𝗘𝗥: 卡姆鲁尔
𝗣𝗥𝗘𝗙𝗜𝗫: ( ${prefix} )

𝗕𝗼𝘁 𝗨𝗽𝘁𝗶𝗺𝗲 :

𝗗𝗮𝘆𝘀: ${days}
𝗛𝗼𝘂𝗿𝘀: ${h} 
𝗠𝗶𝗻𝘂𝘁𝗲𝘀: ${m} 
𝗦𝗲𝗰𝗼𝗻𝗱𝘀: ${s}

𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗧𝗶𝗺𝗲: ${currentTime}
𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿𝘀: ${totalUsers}
𝗧𝗼𝘁𝗮𝗹 𝗧𝗵𝗿𝗲𝗮𝗱𝘀: ${totalThreads}

                𝐁𝐀'𝐁𝐘 くめ
──────────────────`,
        attachment: fs.createReadStream(imagePath)
      });

      fs.unlinkSync(imagePath);
    } catch (err) {
      console.error(err);
      await message.reply("❌ An error occurred while generating the uptime image.");
    }
  }
};

async function getDiskUsage() {
  const { stdout } = await exec("df -k /");
  const [_, total, used] = stdout.split("\n")[1].split(/\s+/).filter(Boolean);
  return {
    total: parseInt(total) * 1024,
    used: parseInt(used) * 1024
  };
}
