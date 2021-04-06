import Header from './Header/template';
import Image from './Image/template';
import Icon from './Icon/template';

const basicTemplate = [
    Header,
    Image,
    Icon
]
const BasicTemplate = basicTemplate.map(v => {
    return { ...v, category: 'base' };
});

export default BasicTemplate;