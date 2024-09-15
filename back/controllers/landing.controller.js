import { sections, appAdvantages, footer, comments } from '../data/mockdata.js';

export const getLanding = (req, res) => {
    const datos = {
        sections: sections,
        appAdvantages: appAdvantages,
        footer: footer,
        comments: comments
    };

    res.status(200).json(datos);
};
