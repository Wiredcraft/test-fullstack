import styles from './style.module.less';

export default {
    show: (content) => {
        const message = document.createElement('div');
        message.className = 'message';
        message.textContent = content;
        document.body.append(message);
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}