describe('Login Flow', () => {

  it('should login successfully', async () => {

    const loginBtn = await $('android=new UiSelector().text("Login")');
    await loginBtn.waitForDisplayed();
    await loginBtn.click();

    await $('id=com.trokeraa.app:id/email')
      .setValue('test@gmail.com');

    await $('id=com.trokeraa.app:id/password')
      .setValue('123456');

    await $('id=com.trokeraa.app:id/login').click();

    console.log('Login flow executed');
  });

});
