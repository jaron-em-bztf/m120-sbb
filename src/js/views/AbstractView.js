class AbstractView
{
    constructor(template)
    {
        this.template = template;
        this.id = template.id;
        this.title = template.title;
    }

    onView()
    {
    }

    validate()
    {
        return true;
    }

    values()
    {
        return {};
    }
}