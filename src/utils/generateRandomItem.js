// 我这里封装一个工具类，用来生成随机的数据
export default function generateRandomItem() {
  // 随机图片宽度
  const width = 200 + Math.floor(Math.random() * 100);

  // 随机图片高度
  const height = 150 + Math.floor(Math.random() * 150);

  // 随机标题
  const title = Array(5 + Math.floor(Math.random() * 10))
    .fill("")
    .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
    .join(" ");

  // 随机描述
  const desc = Array(10 + Math.floor(Math.random() * 20))
    .fill("")
    .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
    .join(" ");

  return { img: `https://placehold.co/${width}x${height}`, title, desc };
}
