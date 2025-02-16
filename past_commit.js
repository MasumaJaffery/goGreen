import simpleGit from 'simple-git';
import moment from 'moment';
import fs from 'fs';
import random from 'random';

const git = simpleGit();

// Set the number of days you want to go back
const daysBack = 30; // Adjust as needed

async function createCommits() {
    for (let i = 0; i < daysBack; i++) {
        const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
        const commitsToday = random.int(2, 3); // 2 to 3 commits per day

        for (let j = 0; j < commitsToday; j++) {
            const timestamp = moment(date)
                .add(random.int(0, 23), 'hours')
                .add(random.int(0, 59), 'minutes')
                .format('YYYY-MM-DD HH:mm:ss');

            fs.writeFileSync('dummy.txt', `Commit for ${timestamp}`);
            await git.add('./dummy.txt');
            await git.commit(`Commit on ${timestamp}`, { '--date': timestamp });
            console.log(`✅ Committed on ${timestamp}`);
        }
    }

    await git.push();
    console.log('🚀 All commits pushed!');
}

createCommits();
