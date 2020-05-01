import * as React from 'react';
import { Card } from '~/components/common/card';

interface CreateFormProps {
    title: string;
    description: string;
    setTitle: (val: string) => void;
    setDescription: (val: string) => void;
    createTask: () => Promise<void>;
}

const CreateForm: React.FC<CreateFormProps> = ({ title, description, setDescription, setTitle, createTask }) => {
    const handleInput = (e) => {
        e.preventDefault();
        switch (e.target.id) {
            case 'title': {
                setTitle(e.target.value);
                break;
            }
            case 'description': {
                setDescription(e.target.value);
                break;
            }
        }
    };

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        await createTask();
    };

    return (
        <Card>
            <h2>Describe</h2>
            <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        id="title"
                        placeholder="Short description"
                        value={title}
                        onChange={(e) => handleInput(e)}
                    />
                    <label className="form-label" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="form-input"
                        id="description"
                        placeholder="Add task description"
                        rows={3}
                        value={description}
                        onChange={(e) => handleInput(e)}
                    />
                </div>
                <div>
                    <button className="btn" onClick={handleClick}>
                        👌 Create
                    </button>
                </div>
            </form>
        </Card>
    );
};

export { CreateForm };
