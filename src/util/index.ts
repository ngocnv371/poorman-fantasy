import { Identifiable } from '@/models';

export const animateCSS = (
  selector: string,
  animation: string,
  prefix = 'animate__'
) =>
  // We create a Promise and return it
  new Promise(resolve => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(selector);
    if (!node) {
      console.warn(`Could not find element with selector ${selector}`);
      return;
    }

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd() {
      if (!node) {
        return;
      }
      node.classList.remove(`${prefix}animated`, animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd);
  });

let lastId = 1;

export function generateId(): string {
  return `generated-id-${++lastId}`;
}

export function formatName(entity: Identifiable): string {
  return `${entity.name} (#${entity.id})`;
}
