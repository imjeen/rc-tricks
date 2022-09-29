import React from 'react';
import styles from './styles.module.less';

export default function Barrage() {
  const groupList = [styles.first, styles.second].map((styleName, index) => {
    return {
      styleName,
      list: getRandomArray(BARRAGES).map((text, index) => ({
        text,
        avatarKey: (index % 6) + 1,
      })),
    };
  });

  return (
    <>
      <div className={styles.barrageWrap}>
        {groupList.map(({ styleName, list }, gIndex) => (
          <div className={[styles.barrage, styleName].join(' ')} key={gIndex}>
            <ul className={styles.animation}>
              {list.map((item, index) => (
                <li key={index}>
                  <span className={[styles.avatar, index].join(' ')}></span>
                  <strong className={styles.text}>{item.text}</strong>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

/**
 * 返回随机排序数组
 *
 * @param {any[]} [arr=[]] - 原始数组
 * @return {any[]}
 */
export function getRandomArray(arr: any[] = []) {
  return arr.sort(() => Math.random() - 0.5);
}

// 弹幕文案
export const BARRAGES = [
  '可能我们都是同一个妈妈吧',
  '天下的妈妈都一个样哈哈哈',
  '我妈实锤',
  '同一个世界同一个妈',
  '我妈拍视频比我还溜',
  '同款妈妈',
  '是亲妈无疑了',
  '过分真实',
  '我已经代入自己了',
  '有内味了',
  '我妈也是，什么东西都一堆一堆的买，说也不听',
  '其实妈妈不是贪便宜，是想省更多钱给我们罢了',
  '这种情况我妈只会说那男的有眼无珠',
  '我每一段情史我妈都知道',
  '情史都知道的那个也太绝了吧',
  '前段时间失恋了，我妈跟着我骂前任，把我骂笑了',
  '没有男朋友',
  '没有男朋友+1',
  '我谈恋爱我妈从来不管',
  '跟前任分手后和老妈聊了一晚上',
  '其实妈妈都是为我们好',
  '我喜欢吃榴莲，每次回家我妈都给我买，从来没嫌贵过',
  '回家全是我喜欢吃的菜',
  '想妈妈做的辣子鸡了',
  '早上起不来，妈妈每次都做好菜放保温盒',
  '我妈嫌弃我的时候好像我不是她生的一样，但又莫名稀罕我嫌弃又稀罕',
  '对对对，我妈甚至觉得我可以嫁吴彦祖',
  '笑死，我妈觉得我这辈子能嫁出去是个奇迹....',
  '我也想有这样的妈妈',
  '世上只有妈妈好',
  '想妈妈了',
  '我们长大了，妈妈却老了呜呜呜',
  '感谢妈妈',
  '神不能无处不在，所以创造了妈妈',
  '最爱妈妈',
  '泪目',
  '祝天下的妈妈节日快乐',
  '大爱无言',
  '妈妈真的默默做了很多',
  '母爱真的伟大',
  '感恩',
  '我的妈妈不完美，但她是世界上最好的妈妈',
  '每一位母亲都辛苦了',
  '每年母亲节都想给妈妈买点什么，但是觉得什么都无法表达自己的感谢',
  '我每次给我妈的礼物都会被吐槽',
  '希望妈妈永远不要老',
];
