import React from 'react';
import styles from './advance.styles.module.less';

export default function MarqueeAdvance({ debug }: { debug?: boolean }) {
  const [enableConfig, setEnableConfig] = React.useState({
    fullWidth: false,
    reverse: false,
    PauseOnHover: false,
    fitContent: false,
    lastChild: false,
  });
  return (
    <div className={[styles.marqueeWrap, debug ? styles.debug : ''].join(' ')}>
      <>
        <section className={enableConfig.fullWidth ? 'enable-animation' : ''}>
          <h2>Full-width (default)</h2>
          <input
            id="enable-animation-1"
            type="checkbox"
            checked={enableConfig.fullWidth}
            onChange={(event) =>
              setEnableConfig((preState) => ({
                ...preState,
                fullWidth: event.target.checked,
              }))
            }
          />
          <label htmlFor="enable-animation-1">Enable animation</label>
          <div className="marquee">
            <ul className="marquee__content">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
            </ul>
            <ul aria-hidden="true" className="marquee__content">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
            </ul>
          </div>
        </section>
        <section className={enableConfig.reverse ? 'enable-animation' : ''}>
          <h2>Reverse</h2>
          <input
            id="enable-animation-2"
            type="checkbox"
            checked={enableConfig.reverse}
            onChange={(event) =>
              setEnableConfig((preState) => ({
                ...preState,
                reverse: event.target.checked,
              }))
            }
          />
          <label htmlFor="enable-animation-2">Enable animation</label>
          <div className="marquee marquee--reverse">
            <ul className="marquee__content">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
            </ul>
            <ul aria-hidden="true" className="marquee__content">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
            </ul>
          </div>
        </section>
        <section
          className={enableConfig.PauseOnHover ? 'enable-animation' : ''}
        >
          <h2>Pause on hover</h2>
          <input
            id="enable-animation-3"
            type="checkbox"
            checked={enableConfig.PauseOnHover}
            onChange={(event) =>
              setEnableConfig((preState) => ({
                ...preState,
                PauseOnHover: event.target.checked,
              }))
            }
          />
          <label htmlFor="enable-animation-3">Enable animation</label>
          <div className="marquee marquee--hover-pause">
            <ul className="marquee__content">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
            </ul>
            <ul aria-hidden="true" className="marquee__content">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
            </ul>
          </div>
        </section>
        <section className={enableConfig.fitContent ? 'enable-animation' : ''}>
          <h2>Fit content</h2>
          <input
            id="enable-animation-4"
            type="checkbox"
            checked={enableConfig.fitContent}
            onChange={(event) =>
              setEnableConfig((preState) => ({
                ...preState,
                fitContent: event.target.checked,
              }))
            }
          />
          <label htmlFor="enable-animation-4">Enable animation</label>
          <div className="marquee marquee--fit-content">
            <ul className="marquee__content">
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
            <ul aria-hidden="true" className="marquee__content">
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          </div>
        </section>
        <section className={enableConfig.lastChild ? 'enable-animation' : ''}>
          <h2>Fit content + position absolute :last-child</h2>
          <input
            id="enable-animation-5"
            type="checkbox"
            checked={enableConfig.lastChild}
            onChange={(event) =>
              setEnableConfig((preState) => ({
                ...preState,
                lastChild: event.target.checked,
              }))
            }
          />
          <label htmlFor="enable-animation-5">Enable animation</label>
          <div className="marquee marquee--fit-content marquee--pos-absolute">
            <ul className="marquee__content">
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
            <ul aria-hidden="true" className="marquee__content">
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          </div>
        </section>
      </>
    </div>
  );
}
