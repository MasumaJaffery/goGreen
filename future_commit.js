import simpleGit from 'simple-git';
import moment from 'moment';
import fs from 'fs';
import random from 'random';

const git = simpleGit();

const daysAhead = 30; // Number of future days to commit March

async function createFutureCommits() {
    for (let i = 0; i < daysAhead; i++) {
        const date = moment().add(i, 'days').format('YYYY-MM-DD');
        const commitsToday = random.int(2, 3);

        for (let j = 0; j < commitsToday; j++) {
            const timestamp = moment(date)
                .add(random.int(0, 23), 'hours')
                .add(random.int(0, 59), 'minutes')
                .format('YYYY-MM-DD HH:mm:ss');

            const fileName = `commit_${date}_${j}.txt`;
            fs.writeFileSync(fileName, `Future commit for ${timestamp}`);

            await git.add(fileName);
            await git.commit(`Commit on ${timestamp}`, { '--date': timestamp });
            console.log(`✅ Committed on ${timestamp}`);
        }
    }

    await git.push();
    console.log('🚀 All future commits pushed successfully!');
}

createFutureCommits();
