import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import {toast} from 'react-toastify';
import Loader from '../components/Loader';

const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const {userInfo} = useSelector((state) => state.auth);


    useEffect(() => {
        setFirstName(userInfo.user.first_name);
        setLastName(userInfo.user.last_name);
        setEmail(userInfo.user.email);
    }, [userInfo.user.first_name, userInfo.user.last_name, userInfo.user.email]);


    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit');
    };

    return (
        <FormContainer>
            <h1>Update Profile</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3' disabled={true}>
                    Update
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ProfileScreen;