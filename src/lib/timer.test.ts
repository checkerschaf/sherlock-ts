import Timer from './timer';

describe('testing lib/timer.ts', () => {
    describe('testing Timer.end()', () => {
        it('should be able to calculate the time between start and end', () => {
            const startTime = 100;
            const endTime = 150;
            const expectedResult = endTime - startTime;

            jest.spyOn(Date, 'now').mockReturnValue(startTime);
            Timer.start();
            jest.resetAllMocks();
            jest.spyOn(Date, 'now').mockReturnValue(endTime);
            const result = Timer.end();

            expect(result).toBe(expectedResult);
        });
    });
});
