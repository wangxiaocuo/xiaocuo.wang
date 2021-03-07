npm run docs:build
cd docs/.vuepress/dist
git init
git add .
time=$(date "+%Y-%m-%d %H:%M:%S")
git commit -m "王小错 在 ${time} 更新"
git remote add origin git@github.com:wangxiaocuo/wangxiaocuo.github.io.git
git push -u --force origin main
