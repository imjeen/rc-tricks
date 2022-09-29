import React from 'react';
import StickyHeader from './StickyHeader';
import styles from './demo.module.less';

export default function DemoStickyHeader() {
  const tabs = [
    {
      id: 'recipe',
      name: '配方',
      special: false,
    },
    {
      id: 'sticker',
      name: '限定素材',
      special: false,
    },
    {
      id: 'more',
      name: '專屬功能',
      special: false,
    },
    {
      id: 'rate',
      name: '超值優惠',
      special: true,
    },
  ];
  return (
    <div className={styles.stickyDemo}>
      <StickyHeader
        className={styles.advanceHeader}
        rangeColor={['#f66f7c', '#f66f7c']}
        backgroundStyle={{
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundImage:
            "url('https://titan-h5.meitu.com/oc-template/assets/xiuxiu-vip-material/oversea/sliverAppBar.png')",
        }}
      >
        {({ unfold, offsetY }) => (
          <>
            <div
              className={styles.topBanner}
              style={{
                transform: `translateY(${0 - 320 * (1 - offsetY)}%)`,
                transition: 'all 0.2s linear',
              }}
            >
              <svg
                className="back-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="30"
              >
                <path d="M256 0C114.837 0 0 114.837 0 256s114.837 256 256 256 256-114.837 256-256S397.163 0 256 0zm57.749 347.584c8.341 8.341 8.341 21.824 0 30.165A21.275 21.275 0 01298.666 384a21.277 21.277 0 01-15.083-6.251L176.917 271.083c-8.341-8.341-8.341-21.824 0-30.165l106.667-106.667c8.341-8.341 21.824-8.341 30.165 0s8.341 21.824 0 30.165L222.165 256l91.584 91.584z" />
              </svg>
            </div>
            <aside className="aside">
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    transform: `translateY(${-(0 - 20 * offsetY)}%)`,
                    transition: 'all 0.2s linear',
                  }}
                >
                  <h2
                    style={{
                      transform: `translateY(${0 + 100 * offsetY}%)`,
                      transition: 'all 0.2s linear',
                    }}
                  >
                    Hello Summer!
                  </h2>
                  <p style={{ ...unfold }}>
                    VIP夏季狂歡節! 海量VIP限定素材&專屬會員功能立即擁有!
                    <br />
                    有效时间至 xx 月 xx 日
                  </p>
                </div>
                {/*  菜单tab */}
                <div className={styles.tabs}>
                  <ul>
                    {tabs.map((item, index) => (
                      <li
                        key={index}
                        className={1 === index ? styles.active : ''}
                      >
                        <div className={styles.tab}>
                          <span
                            className={[]
                              .concat(
                                !!item.special ? styles.special : [],
                                !!item.special ? styles.myfont : [],
                              )
                              .join(' ')}
                          >
                            {item.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </>
        )}
      </StickyHeader>

      {Array(5)
        .fill(0)
        .map((_, index) => (
          <section
            style={{
              minHeight: '300px',
              fontSize: '80px',
              textAlign: 'center',
              color: '#fff',
              backgroundColor: 'gray',
              marginBottom: '5px',
            }}
            key={index}
          >
            {index}
          </section>
        ))}
    </div>
  );
}
